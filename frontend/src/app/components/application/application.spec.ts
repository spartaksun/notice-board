/**
 * Created by spartaksun on 6/3/16.
 */
import {describe, expect, it} from '@angular/core/testing';
import ApplicationComponent from './application';

describe('ApplicationComponent', () => {
    it('is successfully instantiated', () => {
        const app = new ApplicationComponent();
        expect(app instanceof ApplicationComponent).toEqual(true);
    });
});
