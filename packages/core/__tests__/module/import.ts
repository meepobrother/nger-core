import { corePlatform, Module, Injectable } from '@nger/core';

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
export class Demo2Module { }
@Module({
    imports: [Demo2Module],
    providers: []
})
export class DemoModule { }
corePlatform().bootstrapModule(DemoModule).then(res => {
    debugger;
    const demoService = res.injector.get(DemoService)
    demoService.add();
    debugger;
})