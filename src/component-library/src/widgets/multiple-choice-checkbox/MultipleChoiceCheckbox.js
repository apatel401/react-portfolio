import React, {useEffect, useState} from 'react';
import MultipleChoiceCheckboxWrapper from './components/MultipleChoiceCheckboxWrapper';
import ProviderComponent from './components/Provider'
import "../../../styles/multiple-choice-checkbox/style.scss";

function MultipleChoiceCheckbox(props) {
  const [config, setConfig] = useState();

  useEffect(() => {
    fetch(props.config)
      .then((response) => response.json())

      .then((data) => setConfig(data));
  }, []);

  return (
    config !== undefined && config !== "" ? (
      <ProviderComponent config={config} id={props.id}>
              <MultipleChoiceCheckboxWrapper />
    </ProviderComponent>
  ) : (
    <div class="alert alert-danger" role="alert">
										// error: Multiple Choice checkbox - missing config file //{" "}
									</div>
  ))
}

export default MultipleChoiceCheckbox;
