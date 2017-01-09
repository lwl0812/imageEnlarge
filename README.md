# imageEnlarge
点击小图，放大图片
# imageEnlarge
点击小图，放大图片
#这个组件主要是针对angular的写的，下面是使用方法：
##配置项：
<pre>
{ 
    largeImageSrc: "@", // 大图的src，放大的图片的src，如果没有，默认用小图的src
		enableEnlargeImage: "=", // 配置是否可放大
		opts: "=" // opts 包含图片放大的最大高度maxHeight，默认是600，图片放大后要放置的容器，默认是".content"
} 
</pre>

## 使用：

###controller.js
<pre>
angular.module("myApp")
	.controller("imageEnlargeController", function($scope) { <br>
		var vm = $scope.vm = {};
		vm.imgSrc = "images/enlarge_img_small.png";
		vm.imgLargeSrc = "images/enlarge_img_large.png";
		vm.opts = {
			container: "body"
		}
})
</pre>

### html
<pre>
&lt;div ng-controller="imageEnlargeController" class="image-enlarge-controller"&gt; 
  &lt;img opts="vm.opts" ng-src="{{vm.imgSrc}}" large-image-src="{{vm.imgLargeSrc}}" enlarge-image enable-enlarge-image="true"&gt;
&lt;/div&gt;
</pre>
