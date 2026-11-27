import { readFileSync, appendFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const directory = process.argv[2] ?? '/tmp/aac-perf';
const runsPerRevision = 3;
const metrics = {
  score: { label: 'Performance score', format: (x) => x.toFixed(0), better: 1 },
  fcp: { label: 'First Contentful Paint', format: (x) => (x / 1000).toFixed(2) + ' s', better: -1 },
  lcp: { label: 'Largest Contentful Paint', format: (x) => (x / 1000).toFixed(2) + ' s', better: -1 },
  tbt: { label: 'Total Blocking Time', format: (x) => x.toFixed(0) + ' ms', better: -1 },
  cls: { label: 'Cumulative Layout Shift', format: (x) => x.toFixed(3), better: -1 },
  speedIndex: { label: 'Speed Index', format: (x) => (x / 1000).toFixed(2) + ' s', better: -1 },
  transferredKB: { label: 'Network transfer (observed)', format: (x) => x.toFixed(0) + ' KB', better: -1 },
  requests: { label: 'Network requests', format: (x) => x.toFixed(0), better: -1 },
};

function readRun(label, i) {
  const report = JSON.parse(readFileSync(join(directory, label + '-' + i + '.json'), 'utf8'));
  if (report.runtimeError) throw new Error(label + ' run ' + i + ': ' + report.runtimeError.message);
  const audits = report.audits;
  const requests = audits['network-requests']?.details?.items ?? [];
  return {
    score: report.categories.performance.score * 100,
    fcp: audits['first-contentful-paint'].numericValue,
    lcp: audits['largest-contentful-paint'].numericValue,
    tbt: audits['total-blocking-time'].numericValue,
    cls: audits['cumulative-layout-shift'].numericValue,
    speedIndex: audits['speed-index'].numericValue,
    transferredKB: requests.reduce((sum, request) => sum + (request.transferSize || 0), 0) / 1024,
    requests: requests.length,
    lighthouseVersion: report.lighthouseVersion,
  };
}
function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

const before = Array.from({ length: runsPerRevision }, (_, i) => readRun('before', i + 1));
const after = Array.from({ length: runsPerRevision }, (_, i) => readRun('after', i + 1));
const summary = [
  '## AAC Painters — mobile Lighthouse comparison',
  '',
  'Median of **3 runs per revision**, same CI runner, same local production build,',
  'same Chrome binary, Lighthouse version and mobile simulated throttling.',
  'This is a lab benchmark, **not** real-user Core Web Vitals or the live PageSpeed score.',
  '',
  '| Metric | Before (base) | After (PR) | Change |',
  '|---|---:|---:|---:|',
];

for (const [key, def] of Object.entries(metrics)) {
  const a = median(before.map((run) => run[key]));
  const b = median(after.map((run) => run[key]));
  const diff = b - a;
  const sign = diff > 0 ? '+' : '';
  const direction = diff === 0 ? 'same' : diff * def.better > 0 ? 'better' : 'worse';
  const displayDelta = key === 'score' || key === 'requests'
    ? sign + diff.toFixed(0)
    : key === 'cls'
      ? sign + diff.toFixed(3)
      : key === 'transferredKB'
        ? sign + diff.toFixed(0) + ' KB'
        : key === 'tbt'
          ? sign + diff.toFixed(0) + ' ms'
          : sign + (diff / 1000).toFixed(2) + ' s';
  summary.push('| ' + def.label + ' | ' + def.format(a) + ' | ' + def.format(b) + ' | ' + displayDelta + ' (' + direction + ') |');
}
summary.push('', 'Individual JSON reports are in the workflow artifact, with Lighthouse ' + before[0].lighthouseVersion + '.',
  'Repeat the comparison on the deployed URL after merging to validate real CDN and third-party behavior.',
  '');
const markdown = summary.join('\n');
writeFileSync(join(directory, 'summary.md'), markdown);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, markdown);
process.stdout.write(markdown + '\n');
