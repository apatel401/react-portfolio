import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import MultipleChoice from './components/MultipleChoice';
import ProviderComponent from './components/Provider'
import "../../../styles/multiple-choice-component/style.scss";

console.group('%%%PACKAGE_NAME%%% v%%%PACKAGE_VERSION%%%');/*RemoveLogging:skip*/
console.log('using React v' + React.version);/*RemoveLogging:skip*/
console.log('using ReactDOM v' + ReactDOM.version);/*RemoveLogging:skip*/
console.groupEnd();/*RemoveLogging:skip*/

function MultipleChoiceComponent(props) {
  const [config, setConfig] = useState();

  useEffect(() => {
    fetch(props.config)
      .then((response) => response.json())

      .then((data) => setConfig(data));
  }, []);

  return (
    config !== undefined && config !== "" ? (
      <ProviderComponent config={config} id={props.id}>
      <MultipleChoice />
    </ProviderComponent>
  ) : (
    <div className="alert">No config file found</div>
  ))
}

export default MultipleChoiceComponent;
