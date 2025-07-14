export type NavigationItem = {
  title: string
  href?: string
  children?: NavigationItem[]
}

export const navigation: NavigationItem[] = [
  {
    title: 'Introduction',
    children: [
      { title: 'Getting started', href: '/#quickstart' },
      { title: 'Quartz Architecture', href: '/#quartz-architecture' },
      { title: 'How to contribute', href: '#ways-to-contribute' },
      { title: 'Starting with Quartz', href: 'https://start.quartzframework.xyz' },
    ],
  },
  {
    title: 'Framework',
    children: [
      {
        title: 'Core',
        children: [
          {
            title: 'Core Concepts',
            href: '/docs/core',
          },
          {
            title: 'Aspect-Oriented Programming (AOP)',
            href: '/docs/core/aop',
          },
        ],
      },
      {
        title: 'Beans',
        children: [
          {
            title: 'Dependency Injection',
            href: '/docs/framework/beans/dependency-injection',
          },
          {
            title: 'Conditional Beans',
            href: '/docs/framework/beans/conditional-beans',
          },
        ],
      },
      {
        title: 'Tasks',
        children: [
          {
            title: 'Task & Scheduling',
            href: '/docs/framework/tasks',
          },
          {
            title: 'Repeated Tasks',
            href: '/docs/framework/repeated-tasks',
          },
        ],
      },
      {
        title: 'Context',
        children: [
          {
            title: 'Quartz Plugin',
            href: '/docs/framework/context/quartz-plugin',
          },
          {
            title: 'Context Lifecycle & Bootstrapping',
            href: '/docs/framework/context/context-bootstrapping',
          },
        ],
      },
      {
        title: 'CLI',
        href: '/docs/framework/cli',
      },
      {
        title: 'Property Configuration Binding',
        href: '/docs/framework/config/property-configuration',
      },
      {
        title: 'Async Execution',
        href: '/docs/framework/async',
      },
    ],
  },
  {
    title: 'Plugin',
    children: [
      {
        title: 'Listening & Publishing Events',
        href: '/docs/plugin/events',
      },
      {
        title: 'Session Management',
        href: '/docs/plugin/session',
      },
      {
        title: 'Permissions & Security',
        href: '/docs/plugin/security',
      },
      {
        title: 'Spigot Plugin',
        href: '/docs/plugin/spigot',
        children: [
          { title: 'Quickstart', href: '/docs/plugin/spigot/quickstart' },
          { title: 'Session Management', href: '/docs/plugin/spigot/session' },
          { title: 'Permissions & Security', href: '/docs/plugin/spigot/security' },
        ],
      },
      {
        title: 'Bungee Plugin',
        href: '/docs/plugin/bungee',
        children: [
          { title: 'Quickstart', href: '/docs/plugin/bungee/quickstart' },
          { title: 'Session Management', href: '/docs/plugin/bungee/session' },
          { title: 'Permissions & Security', href: '/docs/plugin/bungee/security' },
        ],
      },
    ],
  },
  {
    title: 'Data',
    href: '/docs/data',
    children: [
      { title: 'Getting Started', href: '/docs/data/quickstart' },
      { title: 'Storage Interfaces', href: '/docs/data/storage-interfaces' },
      { title: 'Pagination', href: '/docs/data/pagination' },
      { title: 'Query Language (QQL)', href: '/docs/data/qql' },
      { title: 'Method Based Queries', href: '/docs/data/method-based-queries' },
      { title: 'Entities', href: '/docs/data/entities' },
      {
        title: 'JPA',
        children: [
          { title: 'Quickstart', href: '/docs/data/jpa' },
          { title: 'Hibernate Integration', href: '/docs/data/jpa/hibernate' },
          { title: 'DataSource & HikariConfig', href: '/docs/data/jpa/datasource' },
          { title: 'Transaction Management', href: '/docs/data/jpa/transactions' },
          { title: 'Specification Executor', href: '/docs/data/jpa/specifications' },
          { title: 'JPA Storage', href: '/docs/data/jpa/storage' },
        ],
      }
    ],
  },
]