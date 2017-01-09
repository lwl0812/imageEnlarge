(function() {
	"use strict";
	angular.module("myApp")
	.controller("imageEnlargeController", function($scope) {
		var vm = $scope.vm = {};

		vm.imgSrc = "images/enlarge_img_small.png";
		vm.imgLargeSrc = "images/enlarge_img_large.png";

		vm.opts = {
			container: "body"
		}
	})
	.directive("enlargeImage", function() {
		return {
			restrict: "A",
			scope: {
				largeImageSrc: "@", // 大图的src
				enableEnlargeImage: "=", // 配置是否可放大
				opts: "="
			},
			link: function(scope, element, attrs) {

				var opts = {
					maxHeight: 600, // 图片最大高度
					container: ".content" // 图片放大后要放置的容器
				};

				scope.opts = angular.extend({}, opts, scope.opts);

				var imgSrc,
					imgX,
					imgY,
					smallImgWidth,
					smallImgHeight,
					enableEnlargeImage;

				$(element).addClass("enlarge-image-small"); // 给当前图片添加class

				scope.$watch("enableEnlargeImage", function(newVal) {
					if (newVal) {
						enableEnlargeImage = true;
					} else {
						enableEnlargeImage = false;
					}
				}, true);

				$(element).on("click", function() {

					if (enableEnlargeImage == false) {
						return;
					}
					// 如果有大图的src，就用大图的，没有就用小图的
					if (scope.largeImageSrc) {
						imgSrc = scope.largeImageSrc;
					} else {
						imgSrc = this.getAttribute("src");
					};
					

					imgX = $(element)[0].x; // 获取小图所在位置的x
					imgY = $(element)[0].y; // 获取小图所在位置的y
					smallImgWidth = $(element)[0].width; // 获取小图的宽高
					smallImgHeight = $(element)[0].height;
					// 遮罩层
					var imageOverlay = document.createElement("div");
					imageOverlay.classList.add("enlarge-image-overlay");
					document.querySelector(scope.opts.container).appendChild(imageOverlay);
					$(imageOverlay).on("click", function() {
						$(this).remove();
					});
					// 图片容器
					var imageContainer = document.createElement("div");
					imageContainer.classList.add("enlarge-image-container");
					imageOverlay.appendChild(imageContainer);

					// 图片
					var img = document.createElement("img");
					img.classList.add("enlarge-image-large");
					// 设置大图的位置和宽高
					// $(img).css({top: imgY, left: imgX, width: smallImgWidth, height: smallImgHeight});
					img.style.width = smallImgWidth + "px";
					img.style.height = smallImgHeight + "px";
					imageContainer.style.top = imgY + "px";
					imageContainer.style.left = imgX + "px";

					img.src = imgSrc;					
					img.onload = function() {
						$("body").css({overflow: "hidden"});

						var imgWidth = img.width;
						var imgHeight = img.height;

						if (imgHeight > scope.opts.maxHeight) {
							imgHeight = scope.opts.maxHeight;
							imgWidth = imgWidth * scope.opts.maxHeight / img.height;
						}

						imageContainer.appendChild(img);
						// 设置大图的动画
						$(img).stop().animate({width: imgWidth, height: imgHeight});
						$(imageContainer).stop().animate({left: (window.innerWidth - imgWidth) /2, top: (window.innerHeight - imgHeight) /2})
					};

					// close 按钮
					var btnClose = document.createElement("a");
					// btnClose.classList = "icon gtfe-icon icon-close";
					btnClose.className = "icon-close";
					btnClose.innerHTML = "x";
					imageContainer.appendChild(btnClose);
					$(btnClose).on("click", function() {
						$("body").css({overflow: "auto"});
						$(imageOverlay).remove();
					});
				});
			}
		};
	});
})();