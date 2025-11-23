import 'dotenv/config';
import { Octokit } from '@octokit/rest';

/**
 * AI-StarCluster Main Entry Point
 * Miyabi Agent SDK を使用した自律型開発システム
 */

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'Enushin';
const GITHUB_REPO = process.env.GITHUB_REPO || 'AI-StarCluster';

if (!GITHUB_TOKEN) {
  console.error('❌ GITHUB_TOKEN が設定されていません');
  process.exit(1);
}

// Octokit インスタンスの作成
const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

async function main() {
  console.log('🌸 AI-StarCluster Starting...\n');

  try {
    // GitHub 接続テスト
    console.log('📡 Testing GitHub connection...');
    const { data: user } = await octokit.rest.users.getAuthenticated();
    console.log(`✅ Authenticated as: ${user.login}`);

    // リポジトリ情報取得
    console.log(`\n📦 Repository: ${GITHUB_OWNER}/${GITHUB_REPO}`);
    const { data: repo } = await octokit.rest.repos.get({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
    });
    console.log(`   Description: ${repo.description || 'N/A'}`);
    console.log(`   Stars: ${repo.stargazers_count}`);
    console.log(`   Open Issues: ${repo.open_issues_count}`);

    console.log('\n✨ Setup complete! Miyabi Agent SDK is ready.\n');
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Error:', error.message);
    } else {
      console.error('❌ Unknown error occurred');
    }
    process.exit(1);
  }
}

main();
