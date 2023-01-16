function DVComponent(props: any) {
  // console.log('props :>> ', props);
  // useEffect(() => {
  //   return () => {
  //     second
  //   }
  // }, [])

  return (
    <div>
      <div>头部信息-{props.dVIndex}</div>
      <div>DcmView-{props.dVSeriesKey}</div>
      <div>DcmView</div>
    </div>
  );
}

export default DVComponent;
