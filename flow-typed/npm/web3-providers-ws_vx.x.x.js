// flow-typed signature: beb4a4cee29d641bd3cb0bd86c69a354
// flow-typed version: <<STUB>>/web3-providers-ws_v1.0.0-beta.37/flow_v0.89.0

/**
 * This is an autogenerated libdef stub for:
 *
 *   'web3-providers-ws'
 *
 * Fill this stub out by replacing all the `any` types.
 *
 * Once filled out, we encourage you to share your work with the
 * community by sending a pull request to:
 * https://github.com/flowtype/flow-typed
 */

declare class WebSocketProvider {
  addDefaultEvents: () => null;
  _parseResponse: (data: string) => any[];
  _addResponseCallback: (payload: any, callback: (any) => any) => null;
  _timeout: () => null;
  send: (payload: any, callback: (any) => any) => null;
  on: (type: string, callback: (any) => any) => null;
  removeListener: (type: string, callback: (any) => any) => null;
  removeAllListeners: (type: string) => null;
  reset: () => null;
  disconnect: () => null;
}

declare module 'web3-providers-ws' {
  declare module.exports: {
    WebSocketProvider: typeof WebSocketProvider
  };
}

