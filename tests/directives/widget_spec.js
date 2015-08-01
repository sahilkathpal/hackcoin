describe('widget directive', function() {

	var $httpBackend, $rootScope, $compile, $http;

	beforeEach(
		module('BrsManager')
	);

	beforeEach(
		module('foo')
	);

	beforeEach(inject(function (_$httpBackend_, _$rootScope_, _$compile_, _$http_) {
		$httpBackend = _$httpBackend_;
		$rootScope = _$rootScope_;
		$compile = _$compile_;
		$http = _$http_;
		// $httpBackend.whenGET('app/directives/html/widget.html').respond(200, '<div class="col-lg-3 col-xs-6"> <div class="small-box bg-{{wc}}"> <div class="inner"> <h3> {{val}} </h3> <p> {{text}} </p> </div> <div class="icon"> <i class="ion ion-{{icon}}"></i> </div> <a href="/#/{{btn.link}}" class="small-box-footer"> {{btn.text}} <i class="fa fa-arrow-circle-right"></i> </a> </div> </div>');
	}));

	it('should render defaults when no content is specified', function() {
		var element = $compile('<widget></widget>')($rootScope);
		
		$rootScope.$digest();
		window.el = element;
		console.log(element);
		expect(element.html()).toBe('');
	});
});