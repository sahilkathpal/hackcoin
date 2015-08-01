describe('users.AddUserCtrl', function() {

	var $controller, $httpBackend;

	beforeEach(module('BrsManager.users'));

	beforeEach(inject(function (_$controller_, _$httpBackend_) {
		$controller = _$controller_;
		$httpBackend = _$httpBackend_;
		// $httpBackend.whenGET('')
	}));

	it('should collect the user obj on submit', function() {

		var scope = {};
		$controller('users.AddUserCtrl', {$scope: scope});
		expect(scope.msg).toBe('Add');
		scope.user = {
			name: 'Anil',
			email: 'anil@gmail.com',
			coverage_area: 'chakala, andheri east, mumbai'
		}
		scope.addUser();
		expect(scope.user).toBe(scope.user);

	});
});