var app = angular.module('myApp',[]);
app.controller('myController', function ($scope) {

    $scope.lists =[
        "angular.js",
        "Node.js",
        "Backbone.js",
        "React.js",
        "Ruby on rails",
        "Ember.js"
    ]
});
 
app.directive('myRepeat', function(){
  return {
    transclude : 'element',
    compile : function(element, attr, linker){
      return function($scope, $element, $attr){
        var repeat = $attr.myRepeat,
            match = repeat.match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/),
            indexString = match[1],
            collectionString = match[2],
            parent = $element.parent(),
            elements = [];

        $scope.$watchCollection(collectionString, function(collection){
          var i, block, childScope;

          if(elements.length > 0){
            for (i = 0; i < elements.length; i++) {
              elements[i].el.remove();
              elements[i].scope.$destroy();
            };
            elements = [];
          }

          for (i = 0; i < collection.length; i++) {
            childScope = $scope.$new();
            childScope[indexString] = collection[i];

            linker(childScope, function(clone){
              parent.append(clone); // add to DOM
              block = {};
              block.el = clone;
              block.scope = childScope;
              elements.push(block);
            });
          };
        });
      }
    }
  }
});