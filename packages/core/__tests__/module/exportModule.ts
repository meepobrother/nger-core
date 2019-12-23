import { corePlatform, Module, InjectionToken, Inject, ModuleWithProviders, Controller, Get } from '@nger/core';
export const TOKEN = new InjectionToken(`TOKEN`)
@Controller()
export class DemoController {
    constructor(@Inject(TOKEN) private name: string) { }
    @Get()
    add() {
        console.log(`add`, this.name)
    }
}
@Module({
    imports: [],
    providers: [
        DemoController
    ]
})
export class Demo2Module {
    static forRoot(name: string): ModuleWithProviders {
        return {
            ngModule: Demo2Module,
            providers: [{
                provide: TOKEN,
                useValue: 'demo2 for root'
            }]
        }
    }
    static forFeature(name: string): ModuleWithProviders {
        return {
            ngModule: Demo2Module,
            providers: [{
                provide: TOKEN,
                useValue: 'demo2 for feature'
            }]
        }
    }
}
@Module({
    imports: [Demo2Module.forFeature(`demo3`)],
    providers: [],
    exports: [
        Demo2Module
    ]
})
export class Demo3Module { }


@Module({
    imports: [Demo3Module],
    providers: []
})
export class DemoModule { }
corePlatform().bootstrapModule(DemoModule).then(res => {
    debugger;
    const controller = (res as any).get(DemoController)
    debugger;
})