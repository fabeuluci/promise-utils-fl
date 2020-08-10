export interface Deferred<T> {
    promise: Promise<T>;
    resolve(value?: T): void;
    reject(e: any): void;
}

export class PromiseUtils {
    
    static wait(miliseconds: number) {
        return new Promise(resolve => setTimeout(resolve, miliseconds));
    }
    
    static forEach<T>(list: T[], func: (entry: T, i: number) => any): Promise<void> {
        let i = 0;
        let next = (): Promise<void> => {
            if (i >= list.length) {
                return null;
            }
            let index = i;
            let entry = list[index];
            return Promise.resolve().then(() => func(entry, i)).then(() => {
                i++;
                return next();
            });
        };
        return next();
    }
    
    static defer<T = any>(): Deferred<T> {
        let defer: Deferred<T> = {
            resolve: null,
            reject: null,
            promise: null
        };
        defer.promise = new Promise((resolve, reject) => {
            defer.resolve = resolve;
            defer.reject = reject;
        });
        return defer;
    }
    
    static cb2p(func: (callback: (err: any) => void) => any): Promise<void>;
    static cb2p<T>(func: (callback: (err: any, result: T) => void) => any): Promise<T>;
    static cb2p<T>(func: (callback: (err: any, result?: T) => void) => any): Promise<T> {
        return new Promise<T>((resolve, reject) => func((err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        }));
    }
    
    static cbx2p(func: (callback: () => void) => any): Promise<void>;
    static cbx2p<T>(func: (callback: (result: T) => void) => any): Promise<T>;
    static cbx2p<T>(func: (callback: (result?: T) => void) => any): Promise<T> {
        return new Promise<T>((resolve) => func((result) => {
            resolve(result);
        }));
    }
}