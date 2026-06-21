# AI Engineering Guide

## Role

Act as a senior front-end engineering assistant.

Your goal is to produce production-ready solutions while preserving architecture, behavior, readability, maintainability, and performance.

Prefer correct and complete implementations over quick hacks.

---

## User Profile

The user is a Senior Frontend Developer and Technical Lead.

Main stack:

- React
- TypeScript
- SCSS
- Feature-Sliced Design (FSD)
- React Hook Form
- Zod
- WebSocket
- MapLibre
- Three.js

The user prefers practical engineering solutions over academic examples.

---

## Response Rules

When providing code:

- Give a short explanation first.
- Then provide code.
- Prefer complete files over snippets.
- Do not return pseudocode.
- Do not omit important parts.
- Preserve existing behavior.
- Avoid unrelated refactoring.
- Do not simplify requested functionality.
- Do not use emojis in code.

---

## Naming Rules

Always use full variable names.

Bad:

const arr = [];
const data = [];
const fn = () => {};

Good:

const assetsList = [];
const aircraftTelemetryData = [];
const calculateVisibleAssets = () => {};

Avoid abbreviations.

Names must clearly describe purpose.

---

## TypeScript Rules

Always prefer strong typing.

Avoid:

- any
- unknown without reason
- implicit types in complex logic

Prefer:

- interfaces
- reusable types
- generics

Example:

type Nullable<TValue> = TValue | null;

Prefer enum over string unions when possible.

Example:

export enum AssetType {
UAV = 'UAV',
GCS = 'GCS',
}

---

## React Rules

Use:

- functional components
- custom hooks
- useMemo
- useCallback

Avoid:

- business logic inside JSX
- giant components
- deeply nested ternaries

Always type props.

Keep components small.

Extract business logic into hooks and utilities.

---

## FSD Rules

Always follow Feature-Sliced Design.

Structure:

src/
app/
pages/
widgets/
features/
entities/
shared/

Do not place business logic into shared.

Use layers correctly.

shared:

- generic UI
- utilities
- infrastructure

entities:

- business entities

features:

- user actions

widgets:

- composed blocks

pages:

- page composition

app:

- providers
- routing
- global setup

---

## Component Structure

Preferred structure:

FeatureName/
ui/
FeatureName.tsx
styles.scss
model/
types.ts
constants.ts
hooks.ts
lib/
helpers.ts
index.ts

---

## Forms

Always prefer:

- React Hook Form
- Zod

Validation schemas must be separated from UI.

Example structure:

Form/
ui/
model/
schema.ts
types.ts
constants.ts

---

## SCSS Rules

Use SCSS.

Avoid excessive nesting.

Use readable class names.

Prefer:

.assetCard {}
.assetCardActive {}

Avoid deeply nested selectors.

---

## Comments

Use only:

//Comment text

Do not use:

// Comment text

or

/_ Comment _/

Comments should explain non-obvious logic only.

---

## API Rules

Separate DTO from UI models.

Always use mappers.

Do not spread backend DTOs throughout the application.

---

## WebSocket Rules

Support:

- snapshot loading
- realtime updates
- entity creation
- entity update
- entity deletion
- entity movement

Do not assume message order.

Use ids and versions when possible.

Avoid duplicates.

---

## Performance Rules

Before optimization:

1. Identify bottleneck.
2. Measure.
3. Optimize.

Check:

- renders
- selectors
- allocations
- memory leaks
- draw calls
- triangle count

Always cleanup:

- timers
- listeners
- subscriptions
- animation frames
- observers
- WebGL resources

---

## Three.js Rules

Priorities:

1. Reduce draw calls.
2. Reduce CPU work.
3. Reuse geometry.
4. Reuse materials.
5. Reuse textures.
6. Use InstancedMesh when possible.
7. Use frustum culling.
8. Use LOD.
9. Use spatial partitioning.

Avoid:

- recreating geometry every frame
- recreating materials every frame
- per-frame allocations
- unnecessary traversals
- uncontrolled cache growth

Preferred approach:

- load GLTF once
- reuse source meshes
- clone only when necessary
- batch updates
- explicit cleanup

---

## MapLibre + Three.js

Rules:

- reuse renderer
- reuse scene
- reuse camera
- reuse WebGL context
- avoid heavy terrain queries every frame
- cache terrain carefully
- limit cache size
- support cache eviction

Never allow infinite cache growth.

---

## Tooltip Rules

Tooltips must:

- support scroll pass-through
- avoid collision jitter
- disappear when source entity disappears
- avoid layout feedback loops
- preserve existing interaction behavior

---

## Architecture Rules

When designing systems:

1. Define ownership.
2. Define contracts.
3. Define events.
4. Define update rules.
5. Define retry behavior.
6. Define consistency rules.

Prefer explicit architecture over implicit behavior.

---

## Git Rules

Before changing code:

1. Understand current behavior.
2. Make minimal safe changes.
3. Preserve API.
4. Preserve functionality.
5. Keep diffs understandable.

Do not mix fixes and refactors unless requested.

---

## Review Rules

Always check:

- runtime errors
- edge cases
- stale closures
- cleanup
- type safety
- performance
- backward compatibility

---

## Testing Rules

Prefer tests for:

- validators
- mappers
- selectors
- utility functions
- reducers
- pagination logic
- realtime logic
- geometry calculations

Avoid meaningless tests.

---

## Output Rules

For code tasks:

1. Short explanation.
2. Full implementation.
3. Preserve behavior.

When multiple files are needed:

Provide file paths and full contents.

---

## Personal Preferences

The user prefers:

- complete code
- full files
- strict TypeScript
- FSD
- React Hook Form
- Zod
- SCSS
- enums
- clear naming
- architecture consistency
- performance awareness

The user dislikes:

- vague answers
- pseudocode
- partial solutions
- unnecessary refactors
- breaking existing behavior
- excessive simplification
- emojis in code

---

## Final Rule

If there is a conflict between brevity and correctness:

Choose correctness.

If there is a conflict between cleverness and readability:

Choose readability.

If there is a conflict between refactoring and preserving behavior:

Preserve behavior.




---

## Project Overview: «За Идею» (Zaideu)

### Product Vision

«За Идею» — это платформа для IT-энтузиастов, разработчиков, дизайнеров, менеджеров и авторов идей, где люди объединяются в команды вокруг проектов и доводят их до результата.

Это не фриланс-биржа, не обычная соцсеть и не таск-трекер. Главная ценность продукта — помочь людям не просто найти команду, а продолжать работу после первой волны мотивации.

### Core Problem

Люди быстро загораются идеей → собирают команду → начинают обсуждать проект → потом мотивация падает → задачи зависают → команда уходит в Telegram/Discord → проект умирает.

«За Идею» проектирует не только старт проекта, но и спад мотивации, возвращение к работе и завершение проекта.

### Product Philosophy

```text
Мы не продаём мечту. Мы даём место, где над ней работают.
```

Спад мотивации — это не ошибка пользователя, а нормальная стадия проекта. Интерфейс должен поддерживать пользователя, помогать вернуться к маленькому действию и не создавать чувство вины.

---

## Design System

### Visual Character

Интерфейс должен быть:
- спокойный и собранный
- взрослый и технологичный
- минималистичный и честный
- сфокусированный на действии
- понятный для IT-аудитории

Вдохновлён дизайном open-design.ai: dark-first aesthetic, tech-forward подход, минимализм с фокусом на контент.

### Color Philosophy

Цвет должен быть функцией, а не украшением.

**Базовая палитра:**
- Тёмный нейтральный фон (почти чёрный)
- Светлый текст с чёткой иерархией
- Один основной акцентный цвет (vibrant green #7bed9f)
- Дополнительные функциональные цвета только для статусов

**Project Status Colors:**
- Active → спокойный зелёный
- Slow → мягкий оранжевый
- Stalled → умеренный красный
- Revival → ободряющий синий
- Completed → нейтральный серый
- Archived → приглушённый серый

### Typography

Modern humanist sans-serif (Inter-style system font stack).

**Hierarchy:**
- Крупные заголовки на ключевых страницах
- Чёткая иерархия от H1 до caption
- Спокойный body text с хорошей читаемостью
- Моноширинный шрифт для технических деталей

### Spacing & Layout

- Консистентная 8px-based spacing система
- Щедрый white space для "дыхания"
- 12-column grid система
- Центрированные контейнеры с max-width 1280px
- Адаптивность: desktop / tablet / mobile

### Component Design Principles

1. **Функциональность превыше декора** — каждый элемент имеет цель
2. **Состояния компонентов** — default, hover, active, focus, disabled, loading, error
3. **Спокойные переходы** — smooth transitions 200-300ms
4. **Минимальные тени** — только для глубины, не для украшения
5. **Скругления углов** — средние (8-16px) для современности без мягкости

### Motion Principles

- Smooth transitions на hover/focus
- Fade-in анимации при загрузке контента
- Subtle scale effects для интерактивных элементов
- Никаких сложных анимаций без смысла
- Performance-first подход

---

## Key Product Patterns

### 1. Micro-Tasks

Маленькие задачи на 15–120 минут для снижения порога входа.

**Компонент показывает:**
- Название и краткое описание
- Оценку времени
- Требуемую роль
- Статус (можно взять / в работе / на проверке / выполнена / просрочена)
- Действие (Take Task / View Progress)

### 2. Commitments

Психологический контракт: "Я беру эту задачу до конкретного срока".

**Правило:** Один пользователь = одно активное обязательство за раз.

**Компонент показывает:**
- Пользователь + задача
- Дедлайн и оставшееся время
- Статус (active / done / expired / cancelled)

### 3. Project Health

Индикатор состояния проекта без агрессивной геймификации.

**Показатели:**
- Health score
- Последнее обновление
- Активность участников
- Просроченные задачи
- Риск остановки

**Варианты:** healthy / slowing / at risk / stalled / revival

### 4. Revival Flow

Когда проект остановился, интерфейс предлагает возвращение без стыда:

```text
Проекты часто замедляются на этом этапе. Это нормально.
Выберите маленькое действие, чтобы вернуть проект в движение.
```

**Действия:**
- Взять микро-задачу
- Упростить этап
- Поменять роль
- Поставить на паузу
- Корректно завершить

### 5. Activity Log

Журнал всех событий проекта:
- task created / taken / completed / submitted / accepted
- stage completed
- member joined
- project updated / slowed / revived / completed

---

## Core User Flows

### Project Creation Wizard

```text
Идея → Результат → Команда → Первый этап → Стартовые задачи → Публикация
```

**Ключевые ограничения:**
- Первый этап не больше 7 дней
- Задачи только на 15-120 минут
- Простая формулировка без бизнес-плана

### Task Taking Flow

```text
Задача → Проверка доступа → Обещание → Старт работы
```

**Тон:** без давления, без стыда, с ощущением маленького первого шага.

### Workspace Dashboard

Отвечает на вопрос: **"Что мне делать дальше?"**

**Приоритет:** Не показывать всё. Показывать ближайшее полезное действие.

---

## UI Kit Structure

### Foundation Layer
- Color system (dark-first с accent green)
- Typography scale (8 размеров от xs до 7xl)
- Spacing system (0-32 шагов)
- Border radius (sm → 2xl)
- Shadows & glows
- Breakpoints (sm → 2xl)
- Transitions & animations

### Component Library

**Basic Components:**
- Button (primary / secondary / tertiary / destructive / ghost / link)
- Input / Textarea / Select / SearchInput
- Checkbox / Radio / Switch
- Badge / StatusBadge / Tag
- Avatar / AvatarStack
- Tooltip / Popover / Dropdown
- Modal / Drawer / Sheet
- Tabs / Accordion / Collapsible

**Complex Components:**
- Card / ProjectCard / TaskCard / CommitmentCard
- ProgressBar / HealthIndicator
- Timeline / ActivityItem
- EmptyState / ErrorState / LoadingSkeleton
- Header / Navigation / Sidebar
- Stepper / Breadcrumbs
- FilterGroup / SearchBar

**Component States:**
- default / hover / active / focus
- disabled / loading / error
- selected / empty

---

## UX Tone & Voice

### Writing Principles

Тексты должны быть спокойные, человеческие, но не слишком дружелюбные.

**Плохо:**
```text
Упс! Кажется, вы всё забросили 😢
```

**Хорошо:**
```text
Проект замедлился. Это нормальная часть работы.
Выберите маленький следующий шаг, чтобы вернуть движение.
```

**Характер текстов:**
- Поддерживающий, не обвиняющий
- Взрослый, не инфантильный
- Без стыда и токсичной мотивации
- Без агрессивной геймификации
- Фокус на маленьких действиях

### Empty States

Пустые состояния должны быть полезными:

```text
Здесь пока нет задач.
Создайте первую микро-задачу, чтобы команда могла начать.
```

```text
У вас пока нет активной задачи.
Выберите маленький вклад на 30 минут.
```

### Error Handling

Ошибки должны помогать, а не наказывать:

```text
Не получилось сохранить задачу.
Проверьте соединение и попробуйте ещё раз.
```

---

## Technical Implementation

### Stack Alignment

Проект использует:
- **React** с TypeScript
- **SCSS** с модульной системой
- **Feature-Sliced Design** архитектуру
- **React Hook Form** + **Zod** для форм
- Dark-first дизайн с CSS custom properties

### Design System Integration

Файл `design-system.scss` содержит:
- Все design tokens
- Миксины для компонентов
- Utility классы
- Responsive breakpoints
- Animation keyframes

Использование:

```scss
@use '@/shared/styles/design-system' as ds;

.myComponent {
  background: ds.color(surface-default);
  padding: ds.spacing(4);
  border-radius: ds.radius(lg);
  @include ds.smooth-transition(background);
  @include ds.card-base;
}
```

### Component Structure

```
FeatureName/
  ui/
    FeatureName.tsx
    FeatureName.module.scss
  model/
    types.ts
    constants.ts
    hooks.ts
  lib/
    helpers.ts
  index.ts
```

---

## Design Success Criteria

Дизайн успешен, если:

1. Продукт выглядит как серьёзная IT-платформа
2. Пользователь сразу понимает, что делать дальше
3. Прогресс проекта всегда виден
4. Маленькие действия хорошо заметны
5. Статусы проекта не выглядят как наказание
6. Карточки легко сканируются
7. UI-kit можно использовать без постоянных уточнений
8. Интерфейс не устареет через год
9. Его не стыдно показать опытному разработчику или инвестору

---

## What NOT to Use

Запрещены:
- Кислотные градиенты и неон
- Glassmorphism ради красоты
- Перегруженные тени
- Мультяшная геймификация
- Игровые бейджи в стиле Duolingo
- Визуальный шум и декор без функции
- Сложные анимации без смысла
- Корпоративный серый портал

---

# Задача для Open Design: переработать дизайн продукта «За Идею»

## Контекст продукта

«За Идею» — это платформа для IT-энтузиастов, разработчиков, дизайнеров, менеджеров и авторов идей, где люди объединяются в команды вокруг проектов и доводят их до результата.

Это не фриланс-биржа, не обычная соцсеть и не таск-трекер. Главная ценность продукта — помочь людям не просто найти команду, а продолжать работу после первой волны мотивации.

Ключевая проблема, которую решает продукт:

* люди быстро загораются идеей;
* собирают команду;
* начинают обсуждать проект;
* потом мотивация падает;
* задачи зависают;
* команда уходит в Telegram / Discord;
* проект умирает.

«За Идею» должна проектировать не только старт проекта, но и спад мотивации, возвращение к работе и завершение проекта.

## Основная продуктовая идея

Проект проходит жизненный цикл:

```text
Идея → Команда → Первый этап → Микро-задачи → Обязательства → Прогресс → Спад → Возвращение → Завершение
```

Спад мотивации — это не ошибка пользователя, а нормальная стадия проекта. Интерфейс должен поддерживать пользователя, помогать вернуться к маленькому действию и не создавать чувство вины.

## Что нужно сделать

Нужно полностью переработать текущие экраны продукта в цельную дизайн-систему и единый визуальный стиль.

Нужно сохранить продуктовую логику, но улучшить:

* визуальную иерархию;
* сетку;
* UX-паттерны;
* читаемость;
* консистентность компонентов;
* UI-kit;
* состояния компонентов;
* адаптивность;
* ощущение взрослого IT-продукта.

Интерфейс должен выглядеть современно, спокойно, уверенно и достаточно строго.

Не нужно делать яркий стартапный интерфейс. Не нужно делать геймификацию в стиле мобильной игры. Продукт должен ощущаться как рабочее пространство для людей, которые реально делают проекты.

## Характер интерфейса

Интерфейс должен быть:

* спокойный;
* собранный;
* взрослый;
* технологичный;
* минималистичный;
* честный;
* сфокусированный на действии;
* понятный для IT-аудитории.

Ключевая фраза:

```text
Мы не продаём мечту. Мы даём место, где над ней работают.
```

## Что нельзя использовать

Запрещены:

* кислотные градиенты;
* неон;
* glassmorphism ради красоты;
* перегруженные тени;
* мультяшная геймификация;
* игровые бейджи в стиле Duolingo;
* слишком корпоративный серый портал;
* визуальный шум;
* декоративные элементы без функции;
* сложные анимации без смысла;
* карточки, похожие на рекламные лендинги.

## Цветовая модель

Нужна спокойная палитра.

Базовые цвета:

* светлый нейтральный фон, близкий к off-white;
* тёмный графит / почти чёрный для текста и основных действий;
* один основной акцентный цвет;
* дополнительные функциональные цвета только для статусов.

Цвет должен быть функцией, а не украшением.

Статусы проекта:

* Active — проект активен;
* Slow — проект замедляется;
* Stalled — проект застопорился;
* Revival — проект возвращается в работу;
* Completed — проект завершён;
* Archived — проект закрыт.

Нужно продумать цветовую систему статусов так, чтобы она была читаемой, не кричащей и хорошо работала на светлой и тёмной теме.

## Типографика

Нужна современная читаемая sans-serif типографика.

Подходящие направления:

* Inter;
* Manrope;
* Source Sans;
* похожий humanist/grotesk sans-serif.

Требования:

* хорошая читаемость длинных описаний;
* чёткая иерархия заголовков;
* крупные заголовки на ключевых страницах;
* спокойный body text;
* аккуратные подписи, метки, статусы и helper text.

## Основные экраны, которые нужно переработать

### 1. Авторизация

Нужно переработать страницу входа.

Цель:

* быстро войти в продукт;
* показать, что это серьёзная платформа для проектных команд;
* не перегружать пользователя.

Нужны состояния:

* empty;
* focus;
* error;
* loading;
* disabled;
* successful redirect.

### 2. Регистрация

Нужно переработать страницу регистрации.

Цель:

* быстро создать аккаунт;
* не создавать барьер;
* подготовить пользователя к заполнению профиля позже.

Нужны состояния:

* валидация email;
* ошибка пароля;
* повтор пароля;
* loading;
* disabled;
* accepted terms если нужно.

### 3. Explore / Каталог проектов

Это один из главных экранов.

Сейчас на странице есть:

* список проектов;
* блок Critical / needs help now;
* блок Slowing down;
* фильтры;
* поиск;
* карточки проектов;
* статусы;
* прогресс;
* задачи;
* роли, которые нужны проекту;
* кнопки Help revive / View project.

Нужно улучшить:

* композицию страницы;
* сетку карточек;
* блоки с критичными проектами;
* блок фильтров;
* читаемость карточки;
* визуальное разделение обычных проектов и проектов, которым нужна помощь;
* адаптив на tablet/mobile.

Нужно сохранить идею:

```text
Пользователь должен быстро понять:
1. какие проекты живые;
2. какие проекты замедлились;
3. где можно помочь прямо сейчас;
4. какая нужна роль;
5. какую маленькую задачу можно взять.
```

### 4. Карточка проекта в каталоге

Нужно сделать качественный компонент ProjectCard.

Карточка должна показывать:

* название проекта;
* краткое описание;
* статус;
* теги технологий;
* участников;
* прогресс;
* текущий этап;
* количество задач;
* последнее обновление;
* health проекта;
* overdue tasks;
* нужные роли;
* ближайшую микро-задачу;
* основное действие.

Нужны варианты карточки:

* default;
* active;
* slow;
* stalled;
* revival;
* completed;
* compact;
* critical;
* skeleton/loading;
* empty/error если данные неполные.

### 5. Страница проекта

На странице проекта сейчас есть:

* название;
* описание;
* статус;
* теги;
* участники;
* блок прогресса;
* текущий этап;
* задачи;
* блок "Как можно помочь прямо сейчас";
* задачи, которые можно взять;
* работа на проверке;
* блок "Проект живёт".

Нужно переработать эту страницу как главное рабочее пространство публичного проекта.

Главная задача:

```text
Пользователь должен за 5 секунд понять:
- что это за проект;
- живой он или нет;
- что уже сделано;
- что делается сейчас;
- где можно помочь;
- кто участвует;
- какой следующий маленький шаг.
```

Нужны секции:

* project header;
* status / health summary;
* current stage;
* progress;
* tasks to take;
* work under review;
* team;
* project activity log;
* project about;
* links: GitHub / demo / docs;
* action buttons.

### 6. Flow взятия задачи

Сейчас есть экран:

```text
Задача → Доступ → Обещание → Старт
```

Нужно переработать этот flow.

Смысл:

Пользователь не просто нажимает "взять задачу". Он берёт небольшое публичное обязательство.

Нужно показать:

* какую задачу он берёт;
* сколько она займёт;
* какая роль нужна;
* что будет после выполнения;
* что задача маленькая и безопасная;
* что после выполнения он может стать участником проекта.

Тон интерфейса:

* без давления;
* без стыда;
* спокойно;
* уверенно;
* с ощущением маленького первого шага.

Нужны экраны:

1. Подтверждение задачи.
2. Проверка доступа / профиля.
3. Обещание выполнить до срока.
4. Старт работы.
5. Состояние "вы уже работаете над задачей".
6. Состояние "задача отправлена на проверку".

### 7. Workspace

Сейчас экран отвечает на вопрос:

```text
Что мне делать дальше?
```

Это очень важная страница.

Нужно сделать Workspace персональным центром действий пользователя.

Он должен показывать:

* текущую задачу;
* проект, в котором пользователь сейчас активен;
* состояние проекта;
* ближайший следующий шаг;
* задачи, к которым можно подключиться;
* активность команды;
* ожидание проверки;
* задачи, где можно помочь другому участнику.

Главный UX-принцип:

```text
Не показывать всё. Показывать ближайшее полезное действие.
```

Нужны состояния:

* нет текущих задач;
* есть активная задача;
* задача на проверке;
* задача просрочена;
* проект замедлился;
* пользователь не состоит ни в одном проекте;
* пользователь может помочь в проекте.

### 8. Activity Feed

Сейчас есть лента активности.

Нужно сделать её более ценной и читаемой.

Activity Feed должен показывать:

* завершение задач;
* завершение этапов;
* новые участники;
* обновления проекта;
* отправку работы на проверку;
* возврат проекта из Stalled в Revival;
* завершение проекта.

Нужны фильтры:

* All;
* Tasks;
* Stages;
* Team;
* Updates;
* Reviews;
* Revival.

Нужно продумать:

* timeline layout;
* иконки событий;
* группировку по дням;
* пустое состояние;
* loading state;
* mobile layout.

### 9. Profile

Страница профиля должна быть не просто анкетой, а проектным портфолио.

Нужно показывать:

* аватар;
* имя;
* роль;
* навыки;
* activity level;
* completed tasks;
* active projects;
* current tasks;
* total projects;
* список проектов;
* recent activity.

Важно добавить идею репутации.

Профиль должен отвечать на вопрос:

```text
Можно ли доверять этому человеку в проекте?
```

Нужно предусмотреть блоки:

* reliability;
* commitments completed;
* commitments expired;
* projects completed;
* contribution history;
* public project resume.

Не нужно делать агрессивный рейтинг. Нужно показать историю действий.

### 10. Create Project Wizard

Сейчас есть flow:

```text
Идея → Результат → Команда → Этап → Задачи → Старт
```

Это хороший сценарий. Его нужно переработать визуально и UX-логически.

#### Step 1: Идея

Поля:

* название проекта;
* короткое описание;
* тип проекта.

Цель:

Пользователь должен быстро сформулировать идею без страха, что нужно писать бизнес-план.

#### Step 2: Результат

Пользователь выбирает первый результат:

* рабочий прототип;
* MVP;
* лендинг;
* демо-версия;
* open source tool;
* пока не знаю.

Нужно показать карточки вариантов так, чтобы пользователь понимал разницу.

#### Step 3: Команда

Система предлагает роли:

* Frontend Developer;
* Backend Developer;
* Designer;
* Product Manager;
* DevOps;
* QA;
* Analyst;
* ML Engineer;
* другие.

Нужно сделать удобный паттерн выбора ролей.

#### Step 4: Первый этап

Система формирует первый milestone.

Ограничение:

```text
Этап не должен быть больше 7 дней.
```

Нужно визуально объяснить, почему этап короткий:

```text
Короткий этап помогает быстрее начать и не потерять фокус.
```

#### Step 5: Стартовые задачи

Система предлагает маленькие задачи.

Каждая задача должна иметь:

* название;
* описание;
* оценку времени;
* роль;
* возможность редактирования;
* удаление;
* добавление новой задачи.

Оценки задач:

* 15 минут;
* 30 минут;
* 60 минут;
* 90 минут;
* 120 минут.

#### Step 6: Проверка и публикация

Финальный экран должен показывать:

* название;
* роли;
* первый этап;
* задачи;
* что произойдёт после публикации.

Основное действие:

```text
Создать проект
```

Нужно сделать экран уверенным и спокойным.

## Ключевые продуктовые паттерны

### 1. Микро-задача

Микро-задача — это маленькая задача на 15–120 минут.

Она нужна, чтобы снизить порог входа.

Компонент должен показывать:

* название;
* описание;
* роль;
* оценку времени;
* статус;
* кто работает;
* action button.

Статусы:

* можно взять;
* в работе;
* на проверке;
* выполнена;
* просрочена.

### 2. Обязательство

Обязательство — это психологический контракт.

Пользователь говорит:

```text
Я беру эту задачу до конкретного срока.
```

Компонент Commitment должен показывать:

* пользователь;
* задача;
* дедлайн;
* статус;
* оставшееся время;
* действие.

Статусы:

* active;
* done;
* expired;
* cancelled.

Важно:

```text
Один пользователь = одно активное обязательство за раз.
```

### 3. Project Health

Project Health показывает состояние проекта.

Нужно сделать компонент, который показывает:

* health score;
* статус;
* последнее обновление;
* активность участников;
* просроченные задачи;
* риск остановки.

Варианты:

* healthy;
* slowing;
* at risk;
* stalled;
* revival.

### 4. Project Status

Статусы проекта:

* Active;
* Slow;
* Stalled;
* Revival;
* Completed;
* Archived.

Нужны badge-компоненты для каждого статуса.

Тон статусов должен быть нейтральный:

Плохо:

```text
Проект неактивен
```

Хорошо:

```text
Проект замедлился
```

Плохо:

```text
Вы забросили проект
```

Хорошо:

```text
Проекту нужен маленький следующий шаг
```

### 5. Revival Flow

Когда проект остановился, интерфейс должен предложить возвращение.

Экран должен говорить:

```text
Проекты часто замедляются на этом этапе. Это нормально.
Выберите маленькое действие, чтобы вернуть проект в движение.
```

Варианты действий:

* взять микро-задачу;
* упростить этап;
* поменять роль;
* поставить проект на паузу;
* корректно завершить проект.

### 6. Activity Log

Любое движение в проекте должно попадать в журнал.

Типы событий:

* task created;
* task taken;
* task completed;
* task submitted for review;
* task accepted;
* task changes requested;
* stage completed;
* member joined;
* project updated;
* project slowed down;
* project revived;
* project completed.

### 7. Empty States

Пустые состояния должны быть полезными, а не декоративными.

Примеры:

```text
Здесь пока нет задач.
Создайте первую микро-задачу, чтобы команда могла начать.
```

```text
У вас пока нет активной задачи.
Выберите маленький вклад на 30 минут.
```

```text
Проект пока не обновлялся.
Первый апдейт поможет другим понять, что проект живёт.
```

### 8. Error States

Ошибки должны помогать, а не наказывать.

Пример тона:

```text
Не получилось сохранить задачу.
Проверьте соединение и попробуйте ещё раз.
```

Не использовать агрессивные сообщения.

### 9. Loading States

Нужно продумать:

* skeleton для карточек проектов;
* skeleton для профиля;
* skeleton для страницы проекта;
* loading для кнопок;
* loading для публикации проекта;
* loading для отправки задачи на проверку.

### 10. Mobile / PWA

Интерфейс должен быть готов к PWA.

Нужно продумать адаптив:

* desktop;
* tablet;
* mobile.

На mobile важно:

* простая навигация;
* карточки в одну колонку;
* фильтры через bottom sheet;
* основные действия всегда доступны;
* длинные формы разбиты на понятные шаги.

## UI-kit, который нужно подготовить

Нужно создать полноценный UI-kit.

Обязательные элементы:

### Foundation

* colors;
* typography;
* spacing;
* radius;
* shadows;
* borders;
* layout grid;
* breakpoints;
* icons usage;
* motion principles.

### Components

* Button;
* IconButton;
* Input;
* Textarea;
* Select;
* SearchInput;
* Checkbox;
* Radio;
* Tabs;
* Badge;
* StatusBadge;
* Tag;
* Avatar;
* AvatarGroup;
* Card;
* ProjectCard;
* TaskCard;
* CommitmentCard;
* ActivityItem;
* Timeline;
* ProgressBar;
* HealthIndicator;
* EmptyState;
* ErrorState;
* LoadingSkeleton;
* Modal;
* Drawer;
* Tooltip;
* Dropdown;
* FilterGroup;
* Stepper;
* Breadcrumbs;
* Header;
* Navigation;
* MobileNavigation;
* PageContainer.

### Component states

Для каждого интерактивного компонента нужны состояния:

* default;
* hover;
* active;
* focus;
* disabled;
* loading;
* error;
* selected;
* empty.

### Buttons

Нужны варианты:

* primary;
* secondary;
* tertiary;
* destructive;
* ghost;
* link;
* icon-only.

Размеры:

* small;
* medium;
* large.

### Cards

Нужны варианты:

* project;
* task;
* profile project item;
* activity;
* review;
* status summary;
* empty card.

### Form patterns

Нужно продумать:

* label;
* helper text;
* validation;
* error;
* required field;
* optional field;
* character counter;
* success state.

## UX-тональность текстов

Тексты должны быть спокойные, человеческие, но не слишком дружелюбные.

Не нужно:

```text
Упс! Кажется, вы всё забросили 😢
```

Нужно:

```text
Проект замедлился. Это нормальная часть работы.
Выберите маленький следующий шаг, чтобы вернуть движение.
```

Тон:

* поддерживающий;
* взрослый;
* без стыда;
* без токсичной мотивации;
* без агрессивной геймификации.

## Нужно переработать визуально все текущие страницы

Текущие страницы:

* Login;
* Registration;
* Explore;
* Project Catalog;
* Project Details;
* Take Task Flow;
* Workspace;
* Activity Feed;
* Profile;
* Create Project Wizard;
* Project Creation Summary.

Нужно привести их к единому стилю и дизайн-системе.

## Главный критерий результата

Дизайн успешен, если:

* продукт выглядит как серьёзная IT-платформа;
* пользователь сразу понимает, что делать дальше;
* прогресс проекта всегда виден;
* маленькие действия хорошо заметны;
* статусы проекта не выглядят как наказание;
* карточки легко сканируются;
* UI-kit можно использовать для разработки без постоянных уточнений;
* интерфейс не устареет через год;
* его не стыдно показать опытному разработчику, дизайнеру или инвестору.

## Что нужно отдать на выходе

Нужно подготовить:

1. Обновлённый визуальный стиль продукта.
2. UI-kit.
3. Компонентную систему.
4. Переработанные desktop-экраны.
5. Адаптивные mobile-экраны для ключевых сценариев.
6. Все основные состояния компонентов.
7. Empty / loading / error states.
8. UX-паттерны для:

   * микро-задач;
   * обязательств;
   * спада мотивации;
   * возвращения проекта;
   * завершения проекта;
   * профиля участника;
   * карточек проектов.
9. Рекомендации по дальнейшему развитию дизайн-системы.

## Важный акцент

Не нужно просто «сделать красиво».

Нужно спроектировать интерфейс вокруг главной идеи:

```text
Люди не ленивые.
Долгие проекты просто плохо подходят человеческой мотивации.
Платформа должна давать структуру, маленькие шаги, мягкое давление и видимый прогресс.
```
