import { corePlatform, Module, Injectable, InjectionToken, ModuleWithProviders, Inject } from '@nger/core';
export const Token = new InjectionToken<string>(`Token`)
@Injectable()
export class DemoService {
    constructor(@Inject(Token) private name: string) { }
    add() {
        console.log(`add`, this.name)
    }
}

@Module({
    imports: [],
    providers: [
        DemoService
    ]
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

@Module({
    imports: [Demo2Module.forRoot(`demo`), Demo3Module],
    providers: []
})
export class DemoModule { }
corePlatform().bootstrapModule(DemoModule).then(res => {
    const demo3 = (res as any).get(Demo3Module)
    const demo3_demo2 = (res as any).get(Demo3Module, Demo2Module);
    const demo2 = (res as any).get(Demo2Module)
    const demoService = demo2.injector.get(DemoService)
    demoService.add();
    demo3_demo2.injector.get(DemoService).add();
})