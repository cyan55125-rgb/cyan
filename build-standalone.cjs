const fs = require('fs');
const path = require('path');
const { build } = require('esbuild');

async function main() {
  console.log('📦 开始构建完全离线版单文件...');

  // 1. 读取并清理 Tailwind CSS
  let tailwindCSS = fs.readFileSync('./dist/tailwind-full.css', 'utf-8');
  tailwindCSS = tailwindCSS.replace(/@import\s+url\([^)]*\)\s*;?/g, '');

  // 2. 用 esbuild 打包应用代码 (不设置external，让React也被打包进来)
  const result = await build({
    entryPoints: ['./src/main.tsx'],
    bundle: true,
    format: 'iife',
    globalName: 'SalesTeamApp',
    minify: true,
    sourcemap: false,
    target: ['chrome90', 'firefox88', 'safari14', 'edge90'],
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    loader: {
      '.ts': 'tsx',
      '.css': 'text',
      '.svg': 'text',
    },
    jsx: 'automatic',
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    write: false,
  });

  const jsCode = result.outputFiles[0].text;

  // 3. 读取本地 React 文件（用于确保 react/jsx-runtime 正确）
  const reactCode = fs.readFileSync('./dist/react.min.js', 'utf-8');
  const reactDomCode = fs.readFileSync('./dist/react-dom.min.js', 'utf-8');
  const clsxCode = fs.readFileSync('./dist/clsx.min.js', 'utf-8');

  // 4. 组装完整的单文件 HTML（所有JS完全内联）
  const html = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>销售团队管理系统</title>
<style>${tailwindCSS}</style>
<script>${reactCode}<\/script>
<script>${reactDomCode}<\/script>
<script>${clsxCode}<\/script>
</head>
<body>
<div id="root"></div>
<script>
${jsCode}
<\/script>
</body>
</html>`;

  const outPath = './dist/sales-team-offline.html';
  fs.writeFileSync(outPath, html);

  const sizeMB = (html.length / 1024 / 1024).toFixed(2);
  const sizeKB = Math.round(html.length / 1024);
  console.log(`✅ 构建完成!`);
  console.log(`   文件大小: ${sizeKB}KB (${sizeMB}MB)`);
  console.log(`   输出路径: ${outPath}`);
  console.log(`   特性: 100%离线可用，无需网络连接`);
}

main().catch((e) => {
  console.error('❌ 构建失败:', e);
  process.exit(1);
});
