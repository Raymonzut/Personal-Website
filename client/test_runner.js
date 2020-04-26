const { spawn } = require('child_process')
const fs = require('fs')

const dirs = ['./test', './tests']

if (!dirs.some(fs.existsSync)) {
  throw Error("Could not find any test directories, looked for: " + dirs)
}

const test_dirs = dirs.filter(fs.existsSync)

test_dirs.forEach(test_dir => {
  const files = fs.readdirSync(test_dir)

  if (files.length === 0) {
    throw Error("Could not find test files in " + test_dir)
  }

  const childs = files.map(file => 
    spawn('node', [`${test_dir}/${file}`], { stdio: 'inherit' }) 
  )
})
