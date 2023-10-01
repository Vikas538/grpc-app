/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export const protobufPackage = "auth";

export interface RequestMessage {
  data: string;
}

export interface ResponseMessage {
  responseData: string;
}

function createBaseRequestMessage(): RequestMessage {
  return { data: "" };
}

export const RequestMessage = {
  encode(message: RequestMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data !== "") {
      writer.uint32(10).string(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestMessage {
    return { data: isSet(object.data) ? String(object.data) : "" };
  },

  toJSON(message: RequestMessage): unknown {
    const obj: any = {};
    if (message.data !== "") {
      obj.data = message.data;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestMessage>, I>>(base?: I): RequestMessage {
    return RequestMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestMessage>, I>>(object: I): RequestMessage {
    const message = createBaseRequestMessage();
    message.data = object.data ?? "";
    return message;
  },
};

function createBaseResponseMessage(): ResponseMessage {
  return { responseData: "" };
}

export const ResponseMessage = {
  encode(message: ResponseMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.responseData !== "") {
      writer.uint32(10).string(message.responseData);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.responseData = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseMessage {
    return { responseData: isSet(object.responseData) ? String(object.responseData) : "" };
  },

  toJSON(message: ResponseMessage): unknown {
    const obj: any = {};
    if (message.responseData !== "") {
      obj.responseData = message.responseData;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseMessage>, I>>(base?: I): ResponseMessage {
    return ResponseMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseMessage>, I>>(object: I): ResponseMessage {
    const message = createBaseResponseMessage();
    message.responseData = object.responseData ?? "";
    return message;
  },
};

export interface MyService {
  sendStream(request: Observable<RequestMessage>): Observable<ResponseMessage>;
}

export const MyServiceServiceName = "auth.MyService";
export class MyServiceClientImpl implements MyService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MyServiceServiceName;
    this.rpc = rpc;
    this.sendStream = this.sendStream.bind(this);
  }
  sendStream(request: Observable<RequestMessage>): Observable<ResponseMessage> {
    const data = request.pipe(map((request) => RequestMessage.encode(request).finish()));
    const result = this.rpc.bidirectionalStreamingRequest(this.service, "sendStream", data);
    return result.pipe(map((data) => ResponseMessage.decode(_m0.Reader.create(data))));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
  bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
