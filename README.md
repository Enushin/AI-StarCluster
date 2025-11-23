# AI-StarCluster

Miyabi Agent SDKを使用した自律型開発システム

## 🚀 セットアップ

### 前提条件

- Node.js v20以上
- GitHub Personal Access Token（repo権限付き）

### インストール

```bash
# 依存関係のインストール
npm install

# TypeScriptのビルド
npm run build
```

### 環境変数設定

`.env`ファイルに以下を設定：

```env
GITHUB_TOKEN=your_github_token_here
GITHUB_OWNER=Enushin
GITHUB_REPO=AI-StarCluster
```

## 📦 使用方法

### 基本的な実行

```bash
# 開発モードで実行
npm run dev

# Miyabi Agentを実行
npm run agent

# ビルドして実行
npm run build
npm start
```

### Miyabi CLIコマンド

```bash
# セットアップガイド
npx miyabi setup

# システムヘルスチェック
npx miyabi doctor

# プロジェクト状態確認
npx miyabi status

# エージェント管理
npx miyabi agent

# 認証管理
npx miyabi auth
```

## 🏗️ プロジェクト構造

```
AI-StarCluster/
├── src/
│   ├── index.ts          # メインエントリーポイント
│   └── agent.ts          # Miyabi Agent実装
├── .miyabi/
│   └── config.json       # Miyabi設定ファイル
├── dist/                 # ビルド出力
├── .env                  # 環境変数（Git除外）
├── package.json
├── tsconfig.json
└── README.md
```

## 🤖 Miyabi Agent機能

- ✅ GitHub API接続テスト
- ✅ リポジトリ情報分析
- ✅ Issue自動処理
- ✅ 識学理論準拠ラベル作成
- 🚧 自動タスク割り当て（開発中）
- 🚧 PR自動レビュー（開発中）

## 📚 ドキュメント

- [Miyabi公式ドキュメント](https://github.com/ShunsukeHayashi/Miyabi)
- [識学理論について](https://www.shikigaku.jp/)

## 📄 ライセンス

ISC
