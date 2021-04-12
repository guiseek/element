type PathParams<
  Path extends string
> = Path extends `:${infer Param}/${infer Rest}`
  ? Param | PathParams<Rest>
  : Path extends `:${infer Param}`
  ? Param
  : Path extends `${infer _Prefix}:${infer Rest}`
  ? PathParams<`:${Rest}`>
  : never;

type PathArgs<Path extends string> = {
  [K in PathParams<Path>]: string;
};

interface Req<P extends string> {
  params: PathArgs<P>;
}

const app = {
  get<P extends string>(
    path: P,
    handler: (req: Req<P>, res: any) => void
  ): void {},
};

app.get('/users/:uid', (req, res) => {
  req.params.uid;
});


// type Split<S extends string, D extends string> = S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>] : [S];
// type TakeLast<V> = V extends [] ? never : V extends [string] ? V[0] : V extends [string, ...infer R] ? TakeLast<R> : never;
// type TrimLeft<V extends string> = V extends ` ${infer R}` ? TrimLeft<R> : V;
// type TrimRight<V extends string> = V extends `${infer R} ` ? TrimRight<R> : V;
// type Trim<V extends string> = TrimLeft<TrimRight<V>>;
// type StripModifier<V extends string, M extends string> = V extends `${infer L}${M}${infer A}` ? L : V;
// type StripModifiers<V extends string> = StripModifier<StripModifier<StripModifier<StripModifier<V, '.'>, '#'>, '['>, ':'>;
// type TakeLastAfterToken<V extends string, T extends string> = StripModifiers<TakeLast<Split<Trim<V>, T>>>;
// type GetLastElementName<V extends string> = TakeLastAfterToken<TakeLastAfterToken<V, ' '>, '>'>;
// type GetEachElementName<V, L extends string[] = []> =
//     V extends []
//         ? L
//         : V extends [string]
//         ? [...L, GetLastElementName<V[0]>]
//         : V extends [string, ...infer R]
//         ? GetEachElementName<R, [...L, GetLastElementName<V[0]>]>
//         : [];
// type GetElementNames<V extends string> = GetEachElementName<Split<V, ','>>;
// type ElementByName<V extends string> =
//     V extends keyof HTMLElementTagNameMap
//         ? HTMLElementTagNameMap[V]
//         : V extends keyof SVGElementTagNameMap
//         ? SVGElementTagNameMap[V]
//         : Element;
// type MatchEachElement<V, L extends Element | null = null> =
//     V extends []
//         ? L
//         : V extends [string]
//         ? L | ElementByName<V[0]>
//         : V extends [string, ...infer R]
//         ? MatchEachElement<R, L | ElementByName<V[0]>>
//         : L;

// type QueryResult<T extends string> = MatchEachElement<GetElementNames<T>>;

// /**
//  * Example
//  */
// declare function querySelector<T extends string>(query: T): QueryResult<T>;

// const a = querySelector('div.banner > a.call-to-action') //-> HTMLAnchorElement
// const b = querySelector('input, div') //-> HTMLInputElement | HTMLDivElement
// const c = querySelector('circle[cx="150"]') //-> SVGCircleElement
// const d = querySelector('button#buy-now') //-> HTMLButtonElement
// const e = querySelector('section p:first-of-type'); //-> HTMLParagraphElement

// type ExtractVerb<S extends string> = S extends `${infer Verb} ${infer Activity}`
//   ? Verb
//   : never;

// type Verbs = ExtractVerb<'play chess' | 'write code' | 'read hacker news'>;
// // = "play" | "write" | "read"

// interface ParamsDictionary {
//   [key: string]: string;
// }

// type ParamNames = PathParams<'/users/:userId/posts/:postId'>;
// = "userId" | "postId"

// type Params = PathArgs<'/users/:userId/posts/:postId'>;

// const userId = req.params.userId;
// const postId = req.params.postId;
// res.send(`Requested post ${postId} from user ${userId}`);
