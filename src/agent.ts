import 'dotenv/config';
import { Octokit } from '@octokit/rest';

/**
 * Miyabi Agent - 自律型開発エージェント
 *
 * このエージェントは以下の機能を提供します：
 * - Issue の自動分析と優先順位付け
 * - 識学理論に基づくラベル管理
 * - 開発タスクの自動割り当て
 */

interface AgentConfig {
  owner: string;
  repo: string;
  token: string;
}

class MiyabiAgent {
  private octokit: Octokit;
  private config: AgentConfig;

  constructor(config: AgentConfig) {
    this.config = config;
    this.octokit = new Octokit({
      auth: config.token,
    });
  }

  /**
   * エージェントを起動
   */
  async start() {
    console.log('🤖 Miyabi Agent Starting...\n');

    try {
      await this.verifyConnection();
      await this.analyzeRepository();
      await this.processIssues();

      console.log('\n✨ Miyabi Agent completed successfully!\n');
    } catch (error) {
      console.error('❌ Agent error:', error);
      throw error;
    }
  }

  /**
   * GitHub接続を確認
   */
  private async verifyConnection() {
    console.log('🔐 Verifying GitHub connection...');
    const { data: user } = await this.octokit.rest.users.getAuthenticated();
    console.log(`✅ Connected as: ${user.login}\n`);
  }

  /**
   * リポジトリを分析
   */
  private async analyzeRepository() {
    console.log('📊 Analyzing repository...');

    const { data: repo } = await this.octokit.rest.repos.get({
      owner: this.config.owner,
      repo: this.config.repo,
    });

    console.log(`   Repository: ${repo.full_name}`);
    console.log(`   Description: ${repo.description || 'N/A'}`);
    console.log(`   Language: ${repo.language || 'N/A'}`);
    console.log(`   Open Issues: ${repo.open_issues_count}`);
    console.log(`   Stars: ${repo.stargazers_count}`);
    console.log();
  }

  /**
   * Issueを処理
   */
  private async processIssues() {
    console.log('📝 Processing issues...');

    const { data: issues } = await this.octokit.rest.issues.listForRepo({
      owner: this.config.owner,
      repo: this.config.repo,
      state: 'open',
      per_page: 10,
    });

    if (issues.length === 0) {
      console.log('   No open issues found.');
      return;
    }

    console.log(`   Found ${issues.length} open issue(s):\n`);

    for (const issue of issues) {
      console.log(`   #${issue.number}: ${issue.title}`);
      console.log(`      State: ${issue.state}`);
      console.log(`      Labels: ${issue.labels.map(l => typeof l === 'string' ? l : l.name).join(', ') || 'none'}`);
      console.log();
    }
  }

  /**
   * 識学理論に基づくラベルを作成
   */
  async createShikigakuLabels() {
    console.log('🏷️  Creating Shikigaku-based labels...');

    const labels = [
      // Type labels
      { name: '🐛 type:bug', color: 'd73a4a', description: 'バグ修正' },
      { name: '✨ type:feature', color: '0e8a16', description: '新機能' },
      { name: '📚 type:docs', color: '0075ca', description: 'ドキュメント' },
      { name: '🔧 type:refactor', color: 'fbca04', description: 'リファクタリング' },

      // Priority labels
      { name: '🔥 priority:critical', color: 'b60205', description: '最優先' },
      { name: '⚡ priority:high', color: 'ff9800', description: '高優先度' },
      { name: '📌 priority:medium', color: 'fbca04', description: '中優先度' },
      { name: '📎 priority:low', color: 'c5def5', description: '低優先度' },
    ];

    for (const label of labels) {
      try {
        await this.octokit.rest.issues.createLabel({
          owner: this.config.owner,
          repo: this.config.repo,
          name: label.name,
          color: label.color,
          description: label.description,
        });
        console.log(`   ✅ Created: ${label.name}`);
      } catch (error: any) {
        if (error.status === 422) {
          console.log(`   ⏭️  Already exists: ${label.name}`);
        } else {
          console.error(`   ❌ Failed to create ${label.name}:`, error.message);
        }
      }
    }

    console.log('\n✨ Label creation complete!\n');
  }
}

// メイン処理
async function main() {
  const config: AgentConfig = {
    owner: process.env.GITHUB_OWNER || 'Enushin',
    repo: process.env.GITHUB_REPO || 'AI-StarCluster',
    token: process.env.GITHUB_TOKEN || '',
  };

  if (!config.token) {
    console.error('❌ GITHUB_TOKEN が設定されていません');
    process.exit(1);
  }

  const agent = new MiyabiAgent(config);
  await agent.start();

  // ラベル作成（オプション）
  // await agent.createShikigakuLabels();
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
