import Card from './Card';

type NotItemProps = { message?: string };

const NotItem = ({ message = 'Nothing...' }: NotItemProps) => {
  return (
    <Card>
      <h1>{message}</h1>
    </Card>
  );
};

export default NotItem;
