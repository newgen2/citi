(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs'], factory) :
	(factory((global['user-idle'] = {}),global._angular_core,global.rxjs));
}(this, (function (exports,_angular_core,rxjs) { 'use strict';

var UserIdleServiceConfig = (function () {
    function UserIdleServiceConfig() {
    }
    return UserIdleServiceConfig;
}());

/**
 * User's idle service.
 */
var UserIdleService = (function () {
    function UserIdleService(config) {
        this.timerStart$ = new rxjs.Subject();
        this.timeout$ = new rxjs.Subject();
        /**
         * Idle value in seconds.
         * Default equals to 10 minutes.
         */
        this.idle = 600;
        /**
         * Timeout value in seconds.
         * Default equals to 5 minutes.
         */
        this.timeout = 300;
        /**
         * Ping value in seconds.
         */
        this.ping = 120;
        if (config) {
            this.idle = config.idle;
            this.timeout = config.timeout;
            this.ping = config.ping;
        }
        this.activityEvents$ = rxjs.Observable.merge(rxjs.Observable.fromEvent(window, 'mousemove'), rxjs.Observable.fromEvent(window, 'resize'), rxjs.Observable.fromEvent(document, 'keydown'));
        this.idle$ = rxjs.Observable.from(this.activityEvents$);
    }
    /**
     * Start watching for user idle and setup timer and ping.
     */
    UserIdleService.prototype.startWatching = function () {
        var _this = this;
        /**
         * If any of user events is not active for idle-seconds when start timer.
         */
        this.idleSubscription = this.idle$
            .bufferTime(5000) // Starting point of detecting of user's inactivity
            .filter(function (arr) { return !arr.length && !_this.isInactivityTimer; })
            .switchMap(function () {
            _this.isInactivityTimer = true;
            return rxjs.Observable.interval(1000)
                .takeUntil(rxjs.Observable.merge(_this.activityEvents$, rxjs.Observable.timer(_this.idle * 1000)
                .do(function () { return _this.timerStart$.next(true); })))
                .finally(function () { return _this.isInactivityTimer = false; });
        })
            .subscribe();
        this.setupTimer(this.timeout);
        this.setupPing(this.ping);
    };
    UserIdleService.prototype.stopWatching = function () {
        this.stopTimer();
        if (this.idleSubscription) {
            this.idleSubscription.unsubscribe();
        }
    };
    UserIdleService.prototype.stopTimer = function () {
        this.timerStart$.next(false);
    };
    UserIdleService.prototype.resetTimer = function () {
        this.stopTimer();
        this.isTimeout = false;
    };
    /**
     * Return observable for timer's countdown number that emits after idle.
     * @return {Observable<number>}
     */
    UserIdleService.prototype.onTimerStart = function () {
        var _this = this;
        return this.timerStart$
            .distinctUntilChanged()
            .switchMap(function (start) { return start ? _this.timer$ : rxjs.Observable.of(null); });
    };
    /**
     * Return observable for timeout is fired.
     * @return {Observable<boolean>}
     */
    UserIdleService.prototype.onTimeout = function () {
        var _this = this;
        return this.timeout$
            .filter(function (timeout) { return !!timeout; })
            .map(function () {
            _this.isTimeout = true;
            return true;
        });
    };
    UserIdleService.prototype.getConfigValue = function () {
        return {
            idle: this.idle,
            timeout: this.timeout,
            ping: this.ping
        };
    };
    /**
     * Setup timer.
     *
     * Counts every seconds and return n+1 and fire timeout for last count.
     * @param timeout Timeout in seconds.
     */
    UserIdleService.prototype.setupTimer = function (timeout) {
        var _this = this;
        this.timer$ = rxjs.Observable.interval(1000)
            .take(timeout)
            .map(function () { return 1; })
            .scan(function (acc, n) { return acc + n; })
            .map(function (count) {
            if (count === timeout) {
                _this.timeout$.next(true);
            }
            return count;
        });
    };
    /**
     * Setup ping.
     *
     * Pings every ping-seconds only if is not timeout.
     * @param {number} ping
     */
    UserIdleService.prototype.setupPing = function (ping) {
        var _this = this;
        this.ping$ = rxjs.Observable.interval(ping * 1000).filter(function () { return !_this.isTimeout; });
    };
    UserIdleService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    UserIdleService.ctorParameters = function () { return [
        { type: UserIdleServiceConfig, decorators: [{ type: _angular_core.Optional },] },
    ]; };
    return UserIdleService;
}());

/**
 * User's idle module.
 */
var UserIdleModule = (function () {
    function UserIdleModule() {
    }
    UserIdleModule.forRoot = function (config) {
        return {
            ngModule: UserIdleModule,
            providers: [
                { provide: UserIdleServiceConfig, useValue: config }
            ]
        };
    };
    UserIdleModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    providers: [UserIdleService]
                },] },
    ];
    /** @nocollapse */
    UserIdleModule.ctorParameters = function () { return []; };
    return UserIdleModule;
}());

exports.UserIdleModule = UserIdleModule;
exports.UserIdleService = UserIdleService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
