import React from "react";
import { LazyLog } from 'react-lazylog';
import Loading from "react-lazylog/build/Loading";

export interface Props {
  text: string,
  loading: boolean,
}

const LogTerminal: React.FC<Props> = ({ text, loading }) => {

  return (
    <div style={{ height: text.split("\n").length * 20 }}>
      <LazyLog height="auto" text={text} style={{ borderRadius: 10, paddingTop: 10, paddingBottom: 10 }} />
      {loading && <Loading />}
    </div>
  )
};

export default LogTerminal;
