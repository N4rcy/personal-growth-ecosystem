import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      app: {
        title: "Relationship Court",
        description:
          "A safe space to resolve conflicts with psychological insight",
      },
      nav: {
        dashboard: "Dashboard",
        newCase: "New Case",
        about: "About",
        settings: "Settings",
        darkMode: "Dark Mode",
        lightMode: "Light Mode",
      },
      home: {
        welcome: "Welcome to Relationship Court",
        description:
          "This platform helps you structure difficult conversations, understand different perspectives, and find constructive resolutions.",
        startCase: "Start a New Case",
        totalCases: "Total Cases",
        resolved: "Resolved",
        active: "Active",
        recentCases: "Recent Cases",
        noCases: "No cases yet. Start one to get insights!",
        viewDetails: "View Details",
        delete: "Delete",
        confidenceScore: "Trust Score",
        severityLevel: "Severity",
      },
      case: {
        title: "Start a New Case",
        issuePlaceholder: "Describe the specific situation or conflict...",
        issueLabel: "What happened? *",
        yourPerspectiveLabel: "Your side of the story (required) *",
        yourPerspectivePlaceholder:
          "How did this make you feel? What are your concerns?",
        theirPerspectiveLabel: "Their perspective (optional)",
        theirPerspectivePlaceholder:
          "If you know their side, or what you think they might feel...",
        metadata: "Additional Context (Optional)",
        relationshipType: "Relationship Type",
        relationshipTypes: {
          romantic: "Romantic Partner",
          friendship: "Friend",
          family: "Family Member",
          professional: "Colleague/Professional",
          other: "Other",
        },
        duration: "Relationship Length",
        durations: {
          short: "Less than 6 months",
          medium: "6 months - 2 years",
          long: "More than 2 years",
        },
        intensity: "How intense does this feel? (1-10)",
        recurring: "Has this happened before?",
        yes: "Yes",
        no: "No",
        cancel: "Cancel",
        submit: "Submit Case",
        confirmCancel:
          "You have unsaved changes. Are you sure you want to cancel?",
        success: {
          created: "Case created successfully! Analyzing patterns...",
        },
        errors: {
          issueRequired: "Please describe what happened",
          perspectiveRequired: "Please share your perspective and feelings",
          generic: "Failed to create case. Please try again.",
        },
      },
      verdict: {
        title: "Relationship Insights",
        caseDetails: "Case Details",
        issue: "Issue",
        yourPerspective: "Your Perspective",
        theirPerspective: "Their Perspective",
        conflictAnalysis: "Conflict Analysis",
        emotionalRoots: "Emotional Roots",
        coreNeeds: "Core Needs",
        actionPlan: "Action Plan",
        immediateActions: "Immediate Actions (Next 48h)",
        structuredConversation: "Structured Conversation Guide",
        behavioralAgreements: "Behavioral Agreements",
        progressTracking: "Progress Tracking",
        severityLevel: "Severity Level",
        trustScore: "Trust Gap Analysis",
        newCase: "Start New Case",
        back: "Back to Dashboard",
        copyLink: "Copy Insights Link",
        linkCopied: "Link copied to clipboard!",
        exportAsPDF: "Export as PDF",
        shareInsights: "Share Insights",
      },
      about: {
        title: "About Relationship Court",
        content:
          "Relationship Court uses psychological principles to help you resolve conflicts with emotional intelligence. We analyze patterns, identify core needs, and provide actionable strategies for healthier relationships.",
        features: "Features",
        feature1: "Emotional Pattern Detection",
        feature2: "Cognitive Distortion Analysis",
        feature3: "Attachment Style Insights",
        feature4: "Actionable Communication Frameworks",
        disclaimer:
          "Disclaimer: This tool provides relationship insights but is not a substitute for professional therapy.",
      },
      settings: {
        title: "Settings",
        language: "Language",
        theme: "Theme",
        themeOptions: {
          light: "Light",
          dark: "Dark",
          auto: "System",
        },
        data: "Data Management",
        exportData: "Export All Data",
        importData: "Import Data",
        clearData: "Clear All Data",
        export: {
          success: "Data exported successfully",
          error: "Failed to export data",
        },
        import: {
          success: "Data imported successfully",
          error: "Failed to import data",
          invalid: "Invalid data format",
        },
        clear: {
          success: "All data cleared",
          description: "Redirecting to home page...",
          error: "Failed to clear data",
          confirm:
            "Are you sure? This will permanently delete all your cases. This action cannot be undone.",
        },
        privacy: "Privacy",
        analytics: "Analytics Consent",
        notifications: "Notifications",
      },
    },
  },
  zh: {
    translation: {
      app: {
        title: "关系法庭",
        description: "用心理学洞察解决冲突的安全空间",
      },
      nav: {
        dashboard: "仪表板",
        newCase: "新建案件",
        about: "关于",
        settings: "设置",
        darkMode: "暗色模式",
        lightMode: "亮色模式",
      },
      home: {
        welcome: "欢迎来到关系法庭",
        description:
          "这个平台帮助您组织困难的对话，理解不同观点，找到建设性的解决方案。",
        startCase: "开始新案件",
        totalCases: "总案件数",
        resolved: "已解决",
        active: "进行中",
        recentCases: "最近案件",
        noCases: "还没有案件。开始一个获取洞察！",
        viewDetails: "查看详情",
        delete: "删除",
        confidenceScore: "信任分数",
        severityLevel: "严重程度",
      },
      case: {
        title: "开始新案件",
        issuePlaceholder: "描述具体的情况或冲突...",
        issueLabel: "发生了什么？ *",
        yourPerspectiveLabel: "您的故事（必填） *",
        yourPerspectivePlaceholder: "这件事让您感觉如何？您的担忧是什么？",
        theirPerspectiveLabel: "对方的观点（可选）",
        theirPerspectivePlaceholder:
          "如果您知道他们的想法，或者您认为他们可能会感觉...",
        metadata: "额外背景（可选）",
        relationshipType: "关系类型",
        relationshipTypes: {
          romantic: "恋爱关系",
          friendship: "朋友",
          family: "家人",
          professional: "同事/专业关系",
          other: "其他",
        },
        duration: "关系时长",
        durations: {
          short: "少于6个月",
          medium: "6个月 - 2年",
          long: "超过2年",
        },
        intensity: "这件事让您感觉多强烈？（1-10分）",
        recurring: "以前发生过类似的事吗？",
        yes: "是",
        no: "否",
        cancel: "取消",
        submit: "提交案件",
        confirmCancel: "您有未保存的更改。确定要取消吗？",
        success: {
          created: "案件创建成功！正在分析模式...",
        },
        errors: {
          issueRequired: "请描述发生了什么",
          perspectiveRequired: "请分享您的观点和感受",
          generic: "创建案件失败，请重试。",
        },
      },
      verdict: {
        title: "关系洞察",
        caseDetails: "案件详情",
        issue: "问题",
        yourPerspective: "您的观点",
        theirPerspective: "对方观点",
        conflictAnalysis: "冲突分析",
        emotionalRoots: "情绪根源",
        coreNeeds: "核心需求",
        actionPlan: "行动计划",
        immediateActions: "立即行动（48小时内）",
        structuredConversation: "结构化对话指南",
        behavioralAgreements: "行为协议",
        progressTracking: "进展追踪",
        severityLevel: "严重程度",
        trustScore: "信任差距分析",
        newCase: "开始新案件",
        back: "返回仪表板",
        copyLink: "复制洞察链接",
        linkCopied: "链接已复制到剪贴板！",
        exportAsPDF: "导出为PDF",
        shareInsights: "分享洞察",
      },
      about: {
        title: "关于关系法庭",
        content:
          "关系法庭运用心理学原理，帮助您以情商解决冲突。我们分析模式，识别核心需求，并提供可操作的策略，促进更健康的关系。",
        features: "功能特点",
        feature1: "情绪模式检测",
        feature2: "认知扭曲分析",
        feature3: "依恋风格洞察",
        feature4: "可操作的沟通框架",
        disclaimer: "免责声明：本工具提供关系洞察，但不能替代专业治疗。",
      },
      settings: {
        title: "设置",
        language: "语言",
        theme: "主题",
        themeOptions: {
          light: "浅色",
          dark: "深色",
          auto: "跟随系统",
        },
        data: "数据管理",
        exportData: "导出所有数据",
        importData: "导入数据",
        clearData: "清除所有数据",
        export: {
          success: "数据导出成功",
          error: "导出数据失败",
        },
        import: {
          success: "数据导入成功",
          error: "导入数据失败",
          invalid: "数据格式无效",
        },
        clear: {
          success: "所有数据已清除",
          description: "正在跳转到首页...",
          error: "清除数据失败",
          confirm: "确定吗？这将永久删除您的所有案件。此操作无法撤销。",
        },
        privacy: "隐私",
        analytics: "分析同意",
        notifications: "通知",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
