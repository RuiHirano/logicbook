import React from "react";
import { LazyLog } from 'react-lazylog';
import Loading from "react-lazylog/build/Loading";

export interface Props {
  text: string,
  loading: boolean,
}

const LogTerminal: React.FC<Props> = ({ text, loading }) => {

  return (
    <div style={{ height: "100%" }}>
      <LazyLog follow={true} extraLines={2} enableSearch text={text} caseInsensitive />
      {loading && <Loading />}
    </div>
  )
};

export default LogTerminal;
