import logdown from 'logdown';

const uiLogger = logdown('charity-project:UI');
uiLogger.state.isEnabled = true;

export default uiLogger;
