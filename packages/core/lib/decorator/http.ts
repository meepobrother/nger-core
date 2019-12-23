import { createMethodDecorator, createParameterDecorator, Type, IMethodDecorator, createDecorator, createClassDecorator, IParameterDecorator, IConstructorDecorator } from '@nger/decorator';

/**
 * http methods
 */
import { PathParams, UsePipes, UseGuards } from './types';
interface HttpMethodOptions {
    path: string;
    useGuards?: Type<any>[];
}
export function isHttpMethodOptions(val: any): val is HttpMethodOptions {
    return val && !!val.path
}
export const GetMetadataKey = `GetMetadataKey`
export interface GetOptions extends HttpMethodOptions { }
export const Get = createMethodDecorator<GetOptions | string>(GetMetadataKey, (it: IMethodDecorator<any, GetOptions | string>) => {
    if (it.options && !isHttpMethodOptions(it.options)) {
        it.options = {
            path: it.options
        }
    }
});
export const PostMetadataKey = `PostMetadataKey`
export interface PostOptions extends HttpMethodOptions { }
export const Post = createMethodDecorator<PostOptions | string>(PostMetadataKey, (it: IMethodDecorator<any, PostOptions | string>) => {
    if (it.options && !isHttpMethodOptions(it.options)) {
        it.options = {
            path: it.options
        }
    }
});
export const AllMetadataKey = `AllMetadataKey`
export interface AllOptions extends HttpMethodOptions { }
export const All = createMethodDecorator<AllOptions | string>(AllMetadataKey, (it: IMethodDecorator<any, AllOptions | string>) => {
    if (it.options && !isHttpMethodOptions(it.options)) {
        it.options = {
            path: it.options
        }
    }
});
export const DeleteMetadataKey = `DeleteMetadataKey`
export interface DeleteOptions extends HttpMethodOptions { }
export const Delete = createMethodDecorator<DeleteOptions | string>(DeleteMetadataKey, (it: IMethodDecorator<any, DeleteOptions | string>) => {
    if (it.options && !isHttpMethodOptions(it.options)) {
        it.options = {
            path: it.options
        }
    }
});
export const PatchMetadataKey = `PatchMetadataKey`
export interface PatchOptions extends HttpMethodOptions { }
export const Patch = createMethodDecorator<PatchOptions | string>(PatchMetadataKey, (it: IMethodDecorator<any, PatchOptions | string>) => {
    if (it.options && !isHttpMethodOptions(it.options)) {
        it.options = {
            path: it.options
        }
    }
});
export const OptionsMetadataKey = `OptionsMetadataKey`
export interface OptionsOptions extends HttpMethodOptions { }
export const Options = createMethodDecorator<OptionsOptions | string>(OptionsMetadataKey, (it: IMethodDecorator<any, OptionsOptions | string>) => {
    if (it.options && !isHttpMethodOptions(it.options)) {
        it.options = {
            path: it.options
        }
    }
});
export const HeadMetadataKey = `HeadMetadataKey`
export interface HeadOptions extends HttpMethodOptions { }
export const Head = createMethodDecorator<HeadOptions | string>(HeadMetadataKey, (it: IMethodDecorator<any, HeadOptions | string>) => {
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

export function isWithPipesOptions(val: any): val is WithPipesOptions {
    return val && !!val.property
}
const withPipesOptionsHandler = (it: IParameterDecorator<any, WithPipesOptions | string> | IConstructorDecorator<any, WithPipesOptions | string>) => {
    const options = it.options;
    if (options) {
        if (!isWithPipesOptions(options)) {
            it.options = {
                property: options
            }
        }
    }
}
// http headers
export const HeadersMetadataKey = `HeadersMetadataKey`
export const Headers = createParameterDecorator<WithPipesOptions | string>(HeadersMetadataKey, withPipesOptionsHandler)
// http query and graphql query
export const QueryMetadataKey = `QueryMetadataKey`
export const Query = createDecorator<WithPipesOptions | string>(QueryMetadataKey, withPipesOptionsHandler)

// http post body
export const BodyMetadataKey = `BodyMetadataKey`
export const Body = createParameterDecorator<WithPipesOptions | string>(BodyMetadataKey, withPipesOptionsHandler)

// http path param
export const ParamMetadataKey = `ParamMetadataKey`
export const Param = createParameterDecorator<WithPipesOptions | string>(ParamMetadataKey, withPipesOptionsHandler)

// grpc method
export const GrpcMethodMetadataKey = `GrpcMethodMetadataKey`;
export interface GrpcMethodOptions extends UseGuards {
    path?: string;
}
export function isGrpcMethodOptions(val: any): val is GrpcMethodOptions {
    return val && !!val.property
}
const grpcMethodOptionsHandler = (it: IMethodDecorator<any, GrpcMethodOptions | string>) => {
    const options = it.options;
    if (options) {
        if (!isGrpcMethodOptions(options)) {
            it.options = {
                path: options
            }
        }
    } else {
        it.options = {
            path: it.property as string
        }
    }
}
export const GrpcMethod = createMethodDecorator<GrpcMethodOptions | string>(GrpcMethodMetadataKey, grpcMethodOptionsHandler)
// grpc stream
export const MethodStreamMetadataKey = `MethodStreamMetadataKey`;
export interface MethodStreamOptions extends UseGuards {
    path?: string;
}
export const MethodStream = createMethodDecorator<MethodStreamOptions | string>(MethodStreamMetadataKey, grpcMethodOptionsHandler)

export const StreamMethodMetadataKey = `StreamMethodMetadataKey`;
export interface StreamMethodOptions extends UseGuards {
    path?: string;
}
export const StreamMethod = createMethodDecorator<StreamMethodOptions | string>(StreamMethodMetadataKey, grpcMethodOptionsHandler)

export const DuplexMethodMetadataKey = `DuplexMethodMetadataKey`;
export interface DuplexMethodOptions extends UseGuards {
    path?: string;
}
export const DuplexMethod = createMethodDecorator<DuplexMethodOptions | string>(DuplexMethodMetadataKey, grpcMethodOptionsHandler)

// graphql mutation
export const MutationMetadataKey = `MutationMetadataKey`;
export interface MutationOptions extends UseGuards {
    path?: string;
}
export const Mutation = createMethodDecorator<MutationOptions | string>(MutationMetadataKey, grpcMethodOptionsHandler)
// graphql subscription
export const SubscriptionMetadataKey = `SubscriptionMetadataKey`;
export interface SubscriptionOptions extends UseGuards {
    path?: string;
}
export const Subscription = createMethodDecorator<SubscriptionOptions | string>(SubscriptionMetadataKey, grpcMethodOptionsHandler)
/**
 * graphql resolver
 */
export const ResolverMetadataKey = `ResolverMetadataKey`;
export interface ResolverOptions extends UseGuards {
    path?: string;
}
export const Resolver = createClassDecorator<ResolverOptions>(ResolverMetadataKey);

// graphql info
export const InfoMetadataKey = `InfoMetadataKey`
export interface InfoOptions extends UseGuards { }
export const Info = createClassDecorator<InfoOptions>(InfoMetadataKey)
// graphql source
export const SourceMetadataKey = `SourceMetadataKey`
export interface SourceOptions { }
export const Source = createClassDecorator<SourceOptions>(SourceMetadataKey)
// graphql context
export const ContextMetadataKey = `ContextMetadataKey`
export interface ContextOptions { }
export const Context = createClassDecorator<ContextOptions>(ContextMetadataKey)
