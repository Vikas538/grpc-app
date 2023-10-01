/* eslint-disable */
// import * as _m0 from "protobufjs/minimal";
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

function createBaseResponseMessage(): ResponseMessage {
  return { responseData: "" };
}

export interface MyService {
  sendStream(request: Observable<RequestMessage>): Observable<ResponseMessage>;
}

export const MyServiceServiceName = "auth.MyService";
