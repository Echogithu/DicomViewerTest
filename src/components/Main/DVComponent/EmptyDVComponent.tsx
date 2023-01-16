function EmptyDVComponent() {
  const emptyViewportStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    color: 'white',
  };

  return (
    <div className="empty-viewport" style={emptyViewportStyles}>
      <p>空组件</p>
    </div>
  );
}

export default EmptyDVComponent;
