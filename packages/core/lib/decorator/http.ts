import { createMethodDecorator, createParameterDecorator, Type, IMethodDecorator, createDecorator, createClassDecorator } from '@nger/decorator';

/**
 * http methods
 */
import { PathParams, UsePipes, UseGuards } from './types';
interface HttpMethodOptions {
    path: PathParams;
    useGuards?: Type<any>[];
}
export function isHttpMethodOptions(val: any): val is HttpMethodOptions {
    return val && !!val.path
}
export const GetMetadataKey = `GetMetadataKey`
export interface GetOptions extends HttpMethodOptions { }
export const Get = createMethodDecorator<GetOptions | PathParams>(GetMetadataKey, (it: IMethodDecorator<any, GetOptions | PathParams>) => {
    if (it.options && !isHttpMethodOptions(it.options)) {
        it.options = {
            path: it.options
        }
    }
});
export const PostMetadataKey = `PostMetadataKey`
export const Post = createMethodDecorator<HttpMethodOptions | PathParams>(PostMetadataKey, (it: IMethodDecorator<any, GetOptions | PathParams>) => {
    if (it.options && !isHttpMethodOptions(it.options)) {
        it.options = {
            path: it.options
        }
    }
});
export const AllMetadataKey = `AllMetadataKey`
export const All = createMethodDecorator<HttpMethodOptions | PathParams>(AllMetadataKey, (it: IMethodDecorator<any, GetOptions | PathParams>) => {
    if (it.options && !isHttpMethodOptions(it.options)) {
        it.options = {
            path: it.options
        }
    }
});
export const DeleteMetadataKey = `DeleteMetadataKey`
export const Delete = createMethodDecorator<HttpMethodOptions | PathParams>(DeleteMetadataKey, (it: IMethodDecorator<any, GetOptions | PathParams>) => {
    if (it.options && !isHttpMethodOptions(it.options)) {
        it.options = {
            path: it.options
        }
    }
});
export const PatchMetadataKey = `PatchMetadataKey`
export const Patch = createMethodDecorator<HttpMethodOptions | PathParams>(PatchMetadataKey, (it: IMethodDecorator<any, GetOptions | PathParams>) => {
    if (it.options && !isHttpMethodOptions(it.options)) {
        it.options = {
            path: it.options
        }
    }
});
export const OptionsMetadataKey = `OptionsMetadataKey`
export const Options = createMethodDecorator<HttpMethodOptions | PathParams>(OptionsMetadataKey, (it: IMethodDecorator<any, GetOptions | PathParams>) => {
    if (it.options && !isHttpMethodOptions(it.options)) {
        it.options = {
            path: it.options
        }
    }
});
export const HeadMetadataKey = `HeadMetadataKey`
export const Head = createMethodDecorator<HttpMethodOptions | PathParams>(HeadMetadataKey, (it: IMethodDecorator<any, GetOptions | PathParams>) => {
    if (it.options && !isHttpMethodOptions(it.options)) {
        it.options = {
            path: it.options
        }
    }
});

/**
 * http
 */
export const HeaderMetadataKey = `HeaderMetadataKey`
export interface Header {
    [key: string]: string
}
export const Header = createMethodDecorator<Header>(HeaderMetadataKey);

export const HttpCodeMetadataKey = `HttpCodeMetadataKey`
export const HttpCode = createMethodDecorator<number>(HttpCodeMetadataKey);

export interface Redirect {
    url: string;
    code?: number;
}
export const RedirectMetadataKey = `RedirectMetadataKey`
export const Redirect = createMethodDecorator<Redirect>(RedirectMetadataKey);

export const RenderMetadataKey = `RenderMetadataKey`
export const Render = createMethodDecorator<string>(RenderMetadataKey);

/**
 * http params
 */
export const RequestMetadataKey = `RequestMetadataKey`
interface Request { }
export const Req = createParameterDecorator<Request>(RequestMetadataKey)
export const ResponseMetadataKey = `ResponseMetadataKey`
interface Response { }
export const Res = createParameterDecorator<Response>(ResponseMetadataKey)

export const NextMetadataKey = `NextMetadataKey`
interface Next { }
export const Next = createParameterDecorator<Next>(NextMetadataKey)

export const IpMetadataKey = `IpMetadataKey`
interface Ip { }
export const Ip = createParameterDecorator<Ip>(IpMetadataKey)

export const SessionMetadataKey = `SessionMetadataKey`
interface Session { }
export const Session = createParameterDecorator<Session>(SessionMetadataKey)

export const CookiesMetadataKey = `CookiesMetadataKey`
interface Cookies { }
export const Cookies = createParameterDecorator<Cookies>(CookiesMetadataKey)

export const UploadedFileMetadataKey = `UploadedFileMetadataKey`
export const UploadedFile = createParameterDecorator<string>(UploadedFileMetadataKey)
export const UploadedFilesMetadataKey = `UploadedFilesMetadataKey`
interface UploadedFiles { }
export interface WithPipesOptions extends UsePipes {
    property: string;
}
export const UploadedFiles = createParameterDecorator<UploadedFiles>(UploadedFilesMetadataKey)
// http headers
export const HeadersMetadataKey = `HeadersMetadataKey`
export const Headers = createParameterDecorator<WithPipesOptions>(HeadersMetadataKey)
// http query and graphql query
export const QueryMetadataKey = `QueryMetadataKey`
export const Query = createDecorator<WithPipesOptions>(QueryMetadataKey)

// http post body
export const BodyMetadataKey = `BodyMetadataKey`
export const Body = createParameterDecorator<WithPipesOptions>(BodyMetadataKey)

// http path param
export const ParamMetadataKey = `ParamMetadataKey`
export const Param = createParameterDecorator<WithPipesOptions>(ParamMetadataKey)

// grpc method
export const GrpcMethodMetadataKey = `GrpcMethodMetadataKey`;
export interface GrpcMethodOptions extends UseGuards {
    path?: string;
}
export const GrpcMethod = createMethodDecorator<GrpcMethodOptions>(GrpcMethodMetadataKey)
// grpc stream
export const GrpcStreamMethodMetadataKey = `GrpcStreamMethodMetadataKey`;
export interface GrpcStreamMethodOptions extends UseGuards {
    path?: string;
}
export const GrpcStreamMethod = createMethodDecorator<GrpcStreamMethodOptions>(GrpcStreamMethodMetadataKey)

// graphql mutation
export const MutationMetadataKey = `MutationMetadataKey`;
export interface MutationOptions extends UseGuards {
    path?: string;
}
export const Mutation = createMethodDecorator<MutationOptions>(MutationMetadataKey)
// graphql subscription
export const SubscriptionMetadataKey = `SubscriptionMetadataKey`;
export interface SubscriptionOptions extends UseGuards {
    path?: string;
}
export const Subscription = createMethodDecorator<SubscriptionOptions>(SubscriptionMetadataKey)

/**
 * 过滤info
 */
export const InfoMetadataKey = `InfoMetadataKey`;
export interface InfoOptions extends UsePipes { }
export const Info = createParameterDecorator<InfoOptions>(InfoMetadataKey)

/**
 * resolver
 */
export const ResolverMetadataKey = `ResolverMetadataKey`
export interface ResolverOptions extends UseGuards {
    path?: string;
}
export const Resolver = createClassDecorator<ResolverOptions>(ResolverMetadataKey)
