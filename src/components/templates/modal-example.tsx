import { AlertDialog } from '../ui/alert-dialog';
import { Button } from '../ui/button';

// 방법 1: 네임스페이스 방식 (더 깔끔한 API)
export const BasicExample = () => {
  return (
    <AlertDialog>
      <AlertDialog.Trigger asChild>
        <Button>다이얼로그 열기</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content isDismissable={true}>
        <AlertDialog.Title>제목</AlertDialog.Title>
        <AlertDialog.Description>설명 텍스트입니다.</AlertDialog.Description>
        <AlertDialog.Footer>
          <AlertDialog.Action>확인</AlertDialog.Action>
          <AlertDialog.Cancel>취소</AlertDialog.Cancel>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};
