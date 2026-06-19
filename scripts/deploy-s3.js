import { spawnSync } from 'node:child_process';

const bucket = process.env.AWS_S3_BUCKET;
const region = process.env.AWS_REGION || 'ap-southeast-1';
const distributionId = process.env.AWS_CLOUDFRONT_DISTRIBUTION_ID;

function run(command, args) {
  const result = spawnSync(command, args, { shell: true, stdio: 'inherit' });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

if (!bucket) {
  console.error('Missing AWS_S3_BUCKET. Set it in your environment before running deploy:s3.');
  process.exit(1);
}

run('npm', ['run', 'build']);
run('aws', [
  's3',
  'sync',
  'dist',
  `s3://${bucket}`,
  '--delete',
  '--region',
  region,
  '--cache-control',
  'public,max-age=31536000,immutable',
  '--exclude',
  'index.html',
]);
run('aws', [
  's3',
  'cp',
  'dist/index.html',
  `s3://${bucket}/index.html`,
  '--region',
  region,
  '--cache-control',
  'no-cache',
  '--content-type',
  'text/html',
]);

if (distributionId) {
  run('aws', [
    'cloudfront',
    'create-invalidation',
    '--distribution-id',
    distributionId,
    '--paths',
    '/*',
  ]);
}
