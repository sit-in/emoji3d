#!/usr/bin/env node

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔍 检查 Replicate API 配置...\n');

// 检查环境变量
const apiToken = process.env.REPLICATE_API_TOKEN;

if (!apiToken) {
  console.log('❌ 未找到 REPLICATE_API_TOKEN 环境变量');
  console.log('\n请按照以下步骤配置：');
  console.log('1. 在 .env.local 文件中添加：');
  console.log('   REPLICATE_API_TOKEN=your_token_here');
  console.log('2. 重启开发服务器');
  console.log('\n获取 Token: https://replicate.com/account/api-tokens');
  process.exit(1);
}

if (apiToken === '' || apiToken === 'demo_mode') {
  console.log('⚠️  API Token 未正确设置');
  console.log('当前值:', apiToken);
  console.log('\n请在 .env.local 中设置真实的 API Token');
  process.exit(1);
}

console.log('✅ 找到 API Token:', apiToken.substring(0, 10) + '...');

// 测试 API 连接
console.log('\n📡 测试 Replicate API 连接...');

async function testAPI() {
  try {
    const response = await fetch('https://api.replicate.com/v1/models', {
      headers: {
        'Authorization': `Token ${apiToken}`,
      },
    });

    if (response.ok) {
      console.log('✅ API 连接成功！');
      
      // 检查模型是否可用
      console.log('\n🤖 检查 InstantID 模型...');
      const modelResponse = await fetch('https://api.replicate.com/v1/models/zsxkib/instant-id', {
        headers: {
          'Authorization': `Token ${apiToken}`,
        },
      });

      if (modelResponse.ok) {
        const model = await modelResponse.json();
        console.log('✅ 模型可用:', model.name);
        console.log('   最新版本:', model.latest_version?.id?.substring(0, 8) + '...');
      } else {
        console.log('⚠️  无法访问模型，可能需要更新模型版本');
      }

      console.log('\n🎉 配置完成！您可以开始使用真实的 API 生成 3D Emoji 了！');
    } else {
      console.log('❌ API 认证失败:', response.status);
      console.log('请检查您的 API Token 是否正确');
    }
  } catch (error) {
    console.log('❌ 连接失败:', error.message);
    console.log('请检查网络连接');
  }
}

testAPI().then(() => {
  rl.close();
});