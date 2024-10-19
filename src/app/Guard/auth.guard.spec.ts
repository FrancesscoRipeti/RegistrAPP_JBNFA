import { TestBed } from '@angular/core/testing';
import { CanActivate, Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;

  beforeEach(() => {
    const routerStub = { navigate: jasmine.createSpy('navigate') };
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerStub }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when token exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fake-token'); 
    const canActivate: boolean = guard.canActivate();
    expect(canActivate).toBe(true);
  });

  it('should not allow activation when token does not exist', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); 
    const canActivate: boolean = guard.canActivate();
    expect(canActivate).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/home']); 
  });
});
