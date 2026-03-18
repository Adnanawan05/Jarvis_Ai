# Contributing to J.A.R.V.I.S. Desktop AI Agent

First off, thank you for considering contributing to JARVIS! It's people like you that make JARVIS such a great tool.

## 🌟 Ways to Contribute

### 1. Reporting Bugs

Before creating bug reports, please check existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples**
* **Describe the behavior you observed and what you expected**
* **Include screenshots or GIFs** if possible
* **Include your environment details** (OS, Node version, Python version)
* **Check logs** in `logs/` directory

### 2. Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Clear and descriptive title**
* **Detailed description** of the suggested enhancement
* **Explain why this enhancement would be useful**
* **List any alternatives** you've considered

### 3. Pull Requests

* Fill in the pull request template
* Follow the code style guidelines
* Include screenshots for UI changes
* Update documentation as needed
* Add tests if applicable

## 🛠️ Development Setup

### Prerequisites

* Node.js 18+
* Python 3.10+
* Git

### Setup Steps

```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/Jarvis_Ai.git
cd Jarvis_Ai

# 3. Add upstream remote
git remote add upstream https://github.com/Adnanawan05/Jarvis_Ai.git

# 4. Install dependencies
npm install
pip install -r requirements.txt

# 5. Create a branch
git checkout -b feature/your-feature-name
```

### Running Development Environment

```bash
# Terminal 1: Backend
python backend/server.py

# Terminal 2: Frontend
npm run dev
```

## 📝 Code Style Guidelines

### JavaScript/HTML/CSS

* Use 2 spaces for indentation
* Use meaningful variable names
* Add comments for complex logic
* Follow existing code structure

### Python

* Follow PEP 8 style guide
* Use 4 spaces for indentation
* Add docstrings for functions and classes
* Type hints are encouraged

### Git Commit Messages

* Use present tense ("Add feature" not "Added feature")
* Use imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit first line to 72 characters
* Reference issues and pull requests

**Good Examples:**
```
Add voice recognition for Spanish language
Fix memory leak in particle animation
Update README with installation instructions
```

## 🧪 Testing

### Running Tests

```bash
# Frontend tests (if available)
npm test

# Backend tests (if available)
pytest
```

### Manual Testing

Before submitting a PR, please test:

1. ✅ Application starts without errors
2. ✅ All 7 panels load correctly
3. ✅ Voice recognition works (if changed)
4. ✅ Backend API responds correctly
5. ✅ No console errors
6. ✅ Animations perform smoothly

## 📚 Documentation

When adding new features:

* Update README.md if needed
* Add comments in code
* Update relevant .md files
* Consider adding examples

## 🎨 UI/UX Contributions

For UI changes:

* Maintain the futuristic/cinematic theme
* Ensure animations are smooth (60 FPS)
* Test on multiple screen sizes
* Maintain accessibility standards
* Follow the existing color scheme

## 🐛 Bug Triage

Help us triage bugs:

* Reproduce the bug
* Add more information
* Suggest fixes
* Create minimal test cases

## 💬 Community

* Be respectful and inclusive
* Follow our [Code of Conduct](CODE_OF_CONDUCT.md)
* Help others in Discussions
* Share your JARVIS setups!

## 🏷️ Issue Labels

* `bug` - Something isn't working
* `enhancement` - New feature request
* `documentation` - Documentation improvements
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention needed
* `priority: high` - Critical issues
* `priority: low` - Nice to have

## 📦 Release Process

1. Updates are reviewed by maintainers
2. Approved PRs are merged to main
3. Releases are tagged with semantic versioning
4. Release notes are generated

## 🎯 Feature Requests

We love new ideas! For feature requests:

1. Check if it already exists
2. Explain the use case
3. Describe the solution
4. Consider alternatives
5. Be open to discussion

## ⚡ Quick Start for Common Contributions

### Adding a New Theme

1. Edit `src/styles/main.css`
2. Add color variables
3. Create theme selector in Settings panel
4. Test all panels with new theme

### Adding a Voice Command

1. Edit `backend/server.py`
2. Add command handler in `CommandProcessor`
3. Update `README.md` voice commands section
4. Test voice recognition

### Adding a New Panel

1. Edit `src/index.html`
2. Add panel HTML structure
3. Create CSS in `src/styles/panels.css`
4. Add navigation in `src/scripts/navigation.js`
5. Update README

## 🙏 Thank You!

Your contributions to JARVIS make it better for everyone. We appreciate your time and effort!

---

**Questions?** Open a [Discussion](https://github.com/Adnanawan05/Jarvis_Ai/discussions) or reach out to the maintainers.

**Made with ❤️ by the JARVIS Community**
