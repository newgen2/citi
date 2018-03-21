import { Observable } from 'rxjs';
import { UserIdleServiceConfig } from './user-idle.config';
/**
 * User's idle service.
 */
export declare class UserIdleService {
    ping$: Observable<any>;
    /**
     * Events that can interrupts user's inactivity timer.
     */
    private readonly activityEvents$;
    private timerStart$;
    public timeout$;
    public idle$;
    private timer$;
    /**
     * Idle value in seconds.
     * Default equals to 10 minutes.
     */
    public idle;
    /**
     * Timeout value in seconds.
     * Default equals to 5 minutes.
     */
    public timeout;
    /**
     * Ping value in seconds.
     */
    private ping;
    /**
     * Timeout status.
     */
    private isTimeout;
    /**
     * Timer of user's inactivity is in progress.
     */
    private isInactivityTimer;
    private idleSubscription;
    constructor(config: UserIdleServiceConfig);
    /**
     * Start watching for user idle and setup timer and ping.
     */
    startWatching(): void;
    stopWatching(): void;
    stopTimer(): void;
    resetTimer(): void;
    /**
     * Return observable for timer's countdown number that emits after idle.
     * @return {Observable<number>}
     */
    onTimerStart(): Observable<number>;
    /**
     * Return observable for timeout is fired.
     * @return {Observable<boolean>}
     */
    onTimeout(): Observable<boolean>;
    getConfigValue(): UserIdleServiceConfig;
    /**
     * Setup timer.
     *
     * Counts every seconds and return n+1 and fire timeout for last count.
     * @param timeout Timeout in seconds.
     */
    private setupTimer(timeout);
    /**
     * Setup ping.
     *
     * Pings every ping-seconds only if is not timeout.
     * @param {number} ping
     */
    private setupPing(ping);
}
