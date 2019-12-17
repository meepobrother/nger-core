import { Reducer, Case, corePlatform, Module, Injectable } from '@nger/core';
import { createReducer, on, StoreModule, Store as RxStore, createAction, props } from '@nger/rx.store';
import { Actions, ofType, createEffect, EffectsModule } from '@nger/rx.effects';
import { switchMap } from 'rxjs/operators'
import { of } from 'rxjs';
import { createCoreReducer } from '../lib';
interface DemoAction {
    title: string;
}
const updateUser = createAction<string, DemoAction>(`DemoActions.Demo`, props())
const updateSuccessUser = createAction<string, DemoAction>(`DemoActions.Demo`, props())
export const DemoActions = {
    Demo: `DemoActions.Demo`
}
export class DemoStore {
    tilte: string = ``;
}
@Reducer(`demo`)
export class DemoReducer {
    @Case(updateSuccessUser)
    getUser(state: DemoStore, action: DemoAction) {
        state.tilte = action.title;
        return state;
    }
}
const store = new DemoStore()
const redcucer = createCoreReducer(
    DemoReducer,
    new DemoReducer(),
    handlers => createReducer<DemoStore>(store, ...handlers.map(it => on<DemoStore>(it.type, it.action)))
)
@Injectable()
export class DemoEffects {
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateUser),
            switchMap(action => of(updateSuccessUser({ title: `updateSuccessUser` + action.title })))
        )
    );
    constructor(
        private actions$: Actions
    ) { }
}

@Injectable()
export class DemoService {
    constructor(private store: RxStore<{ demo: DemoStore }>) {
        this.store.subscribe(res => {
            console.log({ res })
        })
    }
    add() {
        this.store.dispatch(updateUser({ title: 'updateUser' }))
    }
}
@Module({
    imports: [
        StoreModule.forRoot(redcucer!),
        EffectsModule.forRoot([
            DemoEffects
        ])
    ],
    providers: [
        DemoService
    ]
})
export class DemoModule { }
corePlatform().bootstrapModule(DemoModule).then(res => {
    const demoService = res.injector.get(DemoService)
    demoService.add();
    debugger;
})