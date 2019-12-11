## @nger/core

```ts
import { OnModuleInit, corePlatform } from '@nger/core';
import { Module, Injector } from '@nger/di';
@Module({
    providers: []
})
export class Demo3Module implements OnModuleInit {
    random: number = Math.random() * 10000;
    constructor(public injector: Injector) { }
    ngOnModuleInit() {
        console.log(`demo module3 on module init`, this.random)
    }
}
@Module({
    providers: [],
    imports: [Demo3Module]
})
export class Demo2Module implements OnModuleInit {
    random: number = Math.random() * 10000;
    constructor(public injector: Injector) { }
    ngOnModuleInit() {
        console.log(`demo module2 on module init`, this.random)
    }
}
@Module({
    providers: [],
    imports: [Demo2Module]
})
export class DemoModule implements OnModuleInit {
    random: number = Math.random() * 10000;
    constructor(public injector: Injector) { }
    ngOnModuleInit() {
        console.log(`demo module on module init`, this.random)
    }
}
corePlatform([]).bootstrapModule(DemoModule).then(res => {
    debugger;
});
```