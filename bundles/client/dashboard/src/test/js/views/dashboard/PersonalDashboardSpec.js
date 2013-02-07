/*
 * Copyright 2013 Next Century Corporation 
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define(['views/dashboard/PersonalDashboard'], function(View) {
    describe('PersonalDashboardSpec', function() {

        beforeEach(function(done) {
            // Stub test initialization method;  And any custom pre-test elements here.
            done();
        });
    
        it('Test base View.  Verify that it has a show and hide method.', function () {
            var view = new View();
            
            expect(view).to.be.an('object');
            expect(view.render).to.be.a('function');
            expect(view.show).to.be.a('function');
            expect(view.hide).to.be.a('function');
        });
    
    });
});
