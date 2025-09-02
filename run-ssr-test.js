import { spawn } from 'child_process';

console.log('Starting SSR test...');

// Run the test-ssr.js file with Node.js
const testProcess = spawn('node', ['test-ssr.js'], {
  stdio: 'inherit'
});

testProcess.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ All SSR tests completed successfully!');
  } else {
    console.error(`\n❌ SSR test process exited with code ${code}`);
  }
});