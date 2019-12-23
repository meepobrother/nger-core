import { corePlatform, Module, Injectable, InjectionToken, Inject, ModuleWithProviders, NgModuleRef, INJECTOR_SCOPE } from '@nger/core';
export const Token = new InjectionToken<string>(`Token`)
@Module({
    imports: [],
    providers: []
})
export class Demo2Module {
    static forRoot(name: string): ModuleWithProviders {
        return {
            ngModule: Demo2Module,
            providers: [{
                provide: Token,
                useValue: name
            }]
        }
    }
    static forFeature(name: string): ModuleWithProviders {
        return {
            ngModule: Demo2Module,
            providers: [{
                provide: Token,
                useValue: name
            }]
        }
    }
}

@Module({
    imports: [Demo2Module.forFeature(`demo3`)],
    providers: []
})
export class Demo3Module { }
@Injectable({
    providedIn: Demo3Module
})
export class DemoService {
    constructor(@Inject(Token) private name: string) { }
    add() {
        console.log(`add`, this.name)
    }
}
@Module({
    imports: [Demo2Module.forRoot(`demo`), Demo3Module],
    providers: []
})
export class DemoModule { }
corePlatform().bootstrapModule(DemoModule).then(res => {
    const demo3 = (res as any).get(Demo3Module)
    const injector = demo3.injector;
    const server = demo3.injector.get(DemoService)
    server.add();
    debugger;
})