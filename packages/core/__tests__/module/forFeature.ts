import { corePlatform, Module, Injectable, InjectionToken, ModuleWithProviders, ApplicationInitStatus } from '@nger/core';
export const Token = new InjectionToken<string>(`Token`)
@Injectable()
export class DemoService {
    add() {
        console.log(`add`)
    }
}
@Module({
    imports: [],
    providers: [
        DemoService
    ]
})
export class Demo2Module {
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
    imports: [Demo2Module.forFeature(`demo`)],
    providers: []
})
export class DemoModule { }
corePlatform().bootstrapModule(DemoModule).then(res => {
    const demoService = res.injector.get(DemoService)
    demoService.add();
})