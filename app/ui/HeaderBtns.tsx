import { Flex } from 'antd';
import Button from './styledComponents/Button/Button';

export interface HeaderBtnsProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function HeaderBtns({ onClick }: HeaderBtnsProps) {
  return (
    <Flex gap={8}>
      <Button type="button" variant="outlined" onClick={onClick}>
        Log In
      </Button>
      <Button type="button" variant="filled" onClick={onClick}>
        Registration
      </Button>
    </Flex>
  );
}
