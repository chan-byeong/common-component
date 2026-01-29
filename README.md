# UI 컴포넌트

공통 UI 컴포넌트 라이브러리입니다. **AlertDialog**와 **Button** 컴포넌트를 제공합니다.

---

## Button

기본 HTML `<button>`을 확장한 버튼 컴포넌트입니다. `variant`, `size`, `asChild` 옵션으로 스타일과 렌더 방식을 제어할 수 있습니다.

### Import

```tsx
import { Button } from './components/ui/button';
```

### Props

| Prop      | Type                                                                          | Default     | 설명                                                   |
| --------- | ----------------------------------------------------------------------------- | ----------- | ------------------------------------------------------ |
| `variant` | `'default' \| 'outline' \| 'ghost' \| 'destructive' \| 'secondary' \| 'link'` | `'default'` | 버튼 스타일 변형                                       |
| `size`    | `'default' \| 'sm' \| 'lg' \| 'icon' \| 'icon-sm' \| 'icon-lg'`               | `'default'` | 버튼 크기                                              |
| `asChild` | `boolean`                                                                     | `false`     | `true`일 때 자식 요소에 스타일/역할을 병합 (Slot 패턴) |
| 기타      | `React.ComponentProps<'button'>`                                              | —           | 네이티브 `button` 속성 모두 사용 가능                  |

### Variant

- **default**: 기본 배경 + 블러
- **outline**: 테두리만 있는 스타일
- **ghost**: 배경 없는 스타일
- **destructive**: 삭제/위험 액션용 (비활성화된 hover)
- **secondary**: 회색 배경
- **link**: 링크처럼 밑줄 스타일

### Size

- **default**, **sm**, **lg**: 패딩만 다른 텍스트 버튼
- **icon**, **icon-sm**, **icon-lg**: 정사각형 아이콘 버튼용 크기

### 사용 예시

```tsx
// 기본
<Button>클릭</Button>

// variant / size
<Button variant="outline" size="sm">작은 아웃라인</Button>
<Button variant="destructive">삭제</Button>
<Button size="icon" aria-label="닫기">×</Button>

// asChild: 자식 요소가 버튼처럼 동작
<Button asChild>
  <a href="/page">링크처럼 쓰는 버튼</a>
</Button>
```

---

## AlertDialog

Compound Component 패턴으로 구현된 알림/확인 다이얼로그입니다. 포털로 body에 렌더되며, 접근성(ARIA)을 고려해 설계되었습니다.

### Import

```tsx
import { AlertDialog } from './components/ui/alert-dialog';
```

### 구성 컴포넌트

| 컴포넌트                  | 설명                                             |
| ------------------------- | ------------------------------------------------ |
| `AlertDialog`             | 루트. `open` / `onOpenChange` 상태 제공          |
| `AlertDialog.Trigger`     | 다이얼로그를 여는 트리거 (기본: `<button>`)      |
| `AlertDialog.Content`     | 실제 다이얼로그 컨테이너 (Portal + Overlay 포함) |
| `AlertDialog.Title`       | 제목 (`h2`, `aria-labelledby` 연결)              |
| `AlertDialog.Description` | 설명 (`p`, `aria-describedby` 연결)              |
| `AlertDialog.Footer`      | 하단 버튼 영역                                   |
| `AlertDialog.Action`      | 확인/실행 버튼 (클릭 시 다이얼로그 닫힘)         |
| `AlertDialog.Cancel`      | 취소 버튼 (클릭 시 다이얼로그 닫힘)              |
| `AlertDialog.Overlay`     | 배경 오버레이 (Content 내부에서 사용)            |
| `AlertDialog.Portal`      | 포털 컨테이너 (직접 사용 시)                     |

### AlertDialog (루트) Props

| Prop           | Type                      | Default | 설명                          |
| -------------- | ------------------------- | ------- | ----------------------------- |
| `defaultOpen`  | `boolean`                 | `false` | 비제어 모드 시 초기 열림 여부 |
| `open`         | `boolean`                 | —       | 제어 모드 시 열림 상태        |
| `onOpenChange` | `(open: boolean) => void` | —       | 열림 상태 변경 시 호출        |
| `children`     | `React.ReactNode`         | 필수    | 하위 컴포넌트                 |

### AlertDialog.Trigger Props

| Prop      | Type                                    | Default | 설명                                          |
| --------- | --------------------------------------- | ------- | --------------------------------------------- |
| `asChild` | `boolean`                               | `false` | `true`일 때 자식 요소에 트리거 역할/ARIA 병합 |
| 기타      | `React.ComponentPropsWithRef<'button'>` | —       | 버튼 속성                                     |

### AlertDialog.Content Props [Preset]

| Prop            | Type                                   | Default | 설명                                                  |
| --------------- | -------------------------------------- | ------- | ----------------------------------------------------- |
| `isDismissable` | `boolean`                              | `false` | `true`면 오버레이 클릭 시 닫힘. Escape 키는 항상 닫힘, [Overlay 컴포넌트의 props로 전달] |
| `children`      | `React.ReactNode`                      | —       | Title, Description, Footer 등                         |
| 기타            | `React.HTMLAttributes<HTMLDivElement>` | —       | div 속성                                              |

### AlertDialog.Portal Props

| Prop          | Type                                   | Default | 설명                                                            |
| ------------- | -------------------------------------- | ------- | --------------------------------------------------------------- |
| `container` | `HTMLElement`                              | `document.body` | Portal의 부모 엘리먼트 설정 |
| 기타          | `React.HTMLAttributes<HTMLDivElement>` | —       | div 속성                                                        |

### AlertDialog.Overlay Props

| Prop          | Type                                   | Default | 설명                                                            |
| ------------- | -------------------------------------- | ------- | --------------------------------------------------------------- |
| `isCloseable` | `boolean`                              | `false` | 오버레이 클릭 시 닫을지 여부 (Content의 `isDismissable`과 연동) |
| 기타          | `React.HTMLAttributes<HTMLDivElement>` | —       | div 속성                                                        |

### AlertDialog.Action / AlertDialog.Cancel Props

| Prop      | Type                                    | Default | 설명                                          |
| --------- | --------------------------------------- | ------- | --------------------------------------------- |
| `asChild` | `boolean`                               | `false` | `true`일 때 자식 요소에 클릭 동작/스타일 병합 |
| 기타      | `React.ComponentPropsWithRef<'button'>` | —       | 버튼 속성                                     |

### 동작 요약

- **Portal**: Content는 `document.body`(또는 `AlertDialogPortal`의 `container`)에 렌더됩니다.
- **스크롤 잠금**: Content가 열려 있는 동안 `document.body`의 `overflow`가 `hidden`으로 설정됩니다.
- **Escape**: Content가 열려 있을 때 `Escape` 키로 닫힙니다.
- **접근성**: `role="alertdialog"`, `aria-modal`, `aria-labelledby`, `aria-describedby` 등이 설정됩니다.

### 사용 예시

```tsx
// 기본 (네임스페이스 방식)
<AlertDialog>
  <AlertDialog.Trigger asChild>
    <Button>다이얼로그 열기</Button>
  </AlertDialog.Trigger>
  <AlertDialog.Content isDismissable>
    <AlertDialog.Title>제목</AlertDialog.Title>
    <AlertDialog.Description>설명 텍스트입니다.</AlertDialog.Description>
    <AlertDialog.Footer>
      <AlertDialog.Action>확인</AlertDialog.Action>
      <AlertDialog.Cancel>취소</AlertDialog.Cancel>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog>;

// 제어 모드
const [open, setOpen] = useState(false);
<AlertDialog open={open} onOpenChange={setOpen}>
  {/* ... */}
</AlertDialog>;
```

---

## 의존성

- **React** (createPortal, Context, hooks)
- **clsx**: `className` 병합
- **@vanilla-extract/css**: Button / AlertDialog 스타일
- **Slot** (`../utils/slot`): `asChild` 패턴용

스타일은 각각 `buttons.css.ts`, `alert-dialog.css.ts`에서 정의됩니다.
