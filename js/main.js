document.addEventListener('DOMContentLoaded', function() {
    console.log('视频网站 main.js loaded');

    // Search bar functionality (Initial - will be replaced/updated below)
    // const searchButton = document.querySelector('.search-bar button');
    // const searchInput = document.querySelector('.search-bar input[type="text"]');

    // if (searchButton && searchInput) {
    //     searchButton.addEventListener('click', function() {
    //         const searchTerm = searchInput.value.trim();
    //         if (searchTerm) {
    //             console.log('搜索词:', searchTerm);
    //             alert(`您搜索了: ${searchTerm}\n(实际搜索功能将在后续步骤实现)`);
    //         } else {
    //             alert('请输入搜索词');
    //         }
    //     });

    //     searchInput.addEventListener('keypress', function(event) {
    //         if (event.key === 'Enter') {
    //             searchButton.click();
    //         }
    //     });
    // } else {
    //     console.warn('Search bar elements not found on initial load for some pages.');
    // }

    // Placeholder for other main page interactions
    // e.g., featured videos carousel initialization

    // Video List Page Logic
    if (document.getElementById('videoListGrid')) { // Check if we are on video_list.html
        const videoListGrid = document.getElementById('videoListGrid');
        const listTitle = document.getElementById('listTitle');
        const noVideosMessage = document.getElementById('noVideosMessage');

        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        const searchQuery = urlParams.get('query');

        let videosToDisplay = [];

        if (searchQuery) {
            listTitle.textContent = `搜索结果: "${searchQuery}"`;
            // Ensure mockVideos is available before trying to filter it
            if (typeof mockVideos !== 'undefined') {
                videosToDisplay = mockVideos.filter(video =>
                    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    video.description.toLowerCase().includes(searchQuery.toLowerCase())
                );
            } else {
                 console.error('mockVideos is not defined for search query.');
            }
        } else if (category) {
            const categoryMap = {
                'movie': '电影',
                'series': '电视剧',
                'anime': '动漫'
            };
            listTitle.textContent = categoryMap[category] || '所有视频';
             // Ensure mockVideos is available
            if (typeof mockVideos !== 'undefined') {
                videosToDisplay = mockVideos.filter(video => video.category === category);
            } else {
                console.error('mockVideos is not defined for category filtering.');
            }
        } else {
            listTitle.textContent = '所有视频';
            if (typeof mockVideos !== 'undefined') {
                videosToDisplay = mockVideos; // Display all if no category/query
            } else {
                console.error('mockVideos is not defined for displaying all videos.');
            }
        }

        function displayVideos(videos) {
            videoListGrid.innerHTML = ''; // Clear existing placeholders
            if (videos.length === 0) {
                if(noVideosMessage) noVideosMessage.style.display = 'block';
                return;
            }
            if(noVideosMessage) noVideosMessage.style.display = 'none';

            videos.forEach(video => {
                const videoItem = document.createElement('div');
                videoItem.classList.add('video-item');
                videoItem.innerHTML = `
                    <a href="player.html?id=${video.id}">
                        <img src="../${video.thumbnail}" alt="${video.title}">
                        <h3>${video.title}</h3>
                        <p>${video.description.substring(0, 50)}...</p>
                    </a>
                `;
                videoListGrid.appendChild(videoItem);
            });
        }

        // Ensure mockVideos is available (from data.js)
        if (typeof mockVideos !== 'undefined') {
            displayVideos(videosToDisplay);
        } else {
            console.error('mockVideos is not defined. Make sure data.js is loaded before main.js and contains mockVideos array.');
            if(videoListGrid) videoListGrid.innerHTML = '<p style="text-align:center;">加载视频数据出错或数据文件 (data.js) 尚未创建。</p>';
            if(noVideosMessage) {
                noVideosMessage.textContent = '视频数据 (data.js) 可能尚未配置。';
                noVideosMessage.style.display = 'block';
            }
        }
    }

    // User authentication status update in header (for all pages that include main.js)
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const profileLink = document.getElementById('profileLink');
    const logoutLink = document.getElementById('logoutLink');
    const loggedInUser = localStorage.getItem('username');

    if (loggedInUser) {
        if(loginLink) loginLink.style.display = 'none';
        if(registerLink) registerLink.style.display = 'none';
        if(profileLink) profileLink.style.display = 'inline';
        if(logoutLink) logoutLink.style.display = 'inline';
        if(profileLink) profileLink.textContent = localStorage.getItem('username') + '的中心'; // Display username
    } else {
        if(loginLink) loginLink.style.display = 'inline';
        if(registerLink) registerLink.style.display = 'inline';
        if(profileLink) profileLink.style.display = 'none';
        if(logoutLink) logoutLink.style.display = 'none';
    }

    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('mockUserToken');
            localStorage.removeItem('username');
            alert('您已成功退出。');
            // Check current page to redirect correctly
            if (window.location.pathname.includes('/pages/')) {
                 window.location.href = '../index.html';
            } else {
                 window.location.href = 'index.html';
            }
        });
    }

    // Update search bar functionality to redirect to video_list.html (handles search from any page)
    const searchButtonGlobal = document.querySelector('.search-bar button');
    const searchInputGlobal = document.querySelector('.search-bar input[type="text"]');

    if (searchButtonGlobal && searchInputGlobal) {
        searchButtonGlobal.onclick = function() {
            const searchTerm = searchInputGlobal.value.trim();
            if (searchTerm) {
                let searchPageUrl = '';
                // If on index.html or at the root, path to pages/video_list.html
                if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || !window.location.pathname.includes('/pages/')) {
                    searchPageUrl = `pages/video_list.html?query=${encodeURIComponent(searchTerm)}`;
                } else { // Already in /pages/ directory
                    searchPageUrl = `video_list.html?query=${encodeURIComponent(searchTerm)}`;
                }
                window.location.href = searchPageUrl;
            } else {
                alert('请输入搜索词');
            }
        };

        if(searchInputGlobal) {
            searchInputGlobal.onkeypress = function(event) {
                if (event.key === 'Enter') {
                    searchButtonGlobal.click(); // Trigger the redefined onclick
                }
            };
        }
    } else {
        // This will appear on pages without a search bar if not careful, e.g. login/register
        // console.warn('Global search bar elements not found. This is normal for auth pages.');
    }

    // Video Player Page Logic
    if (document.getElementById('mainVideoPlayer')) { // Check if we are on player.html
        const videoPlayer = document.getElementById('mainVideoPlayer');
        const videoTitleElem = document.getElementById('videoTitle');
        const videoDescriptionElem = document.getElementById('videoDescription');
        const relatedVideosGrid = document.getElementById('relatedVideosGrid');

        const urlParams = new URLSearchParams(window.location.search);
        const videoId = urlParams.get('id');

        if (typeof mockVideos !== 'undefined' && videoId) {
            const videoData = mockVideos.find(v => v.id === videoId);

            if (videoData) {
                document.title = videoData.title + " - 视频网站"; // Update page title
                videoTitleElem.textContent = videoData.title;
                videoDescriptionElem.textContent = videoData.description;

                videoPlayer.src = `../${videoData.videoUrl}`;

                const related = mockVideos.filter(v => v.category === videoData.category && v.id !== videoId).slice(0, 4); // Show up to 4

                relatedVideosGrid.innerHTML = ''; // Clear placeholder
                if (related.length > 0) {
                    related.forEach(relVideo => {
                        const videoItem = document.createElement('div');
                        videoItem.classList.add('video-item');
                        videoItem.innerHTML = `
                            <a href="player.html?id=${relVideo.id}">
                                <img src="../${relVideo.thumbnail}" alt="${relVideo.title}">
                                <h3>${relVideo.title}</h3>
                                <p>${relVideo.description.substring(0, 50)}...</p>
                            </a>
                        `;
                        relatedVideosGrid.appendChild(videoItem);
                    });
                } else {
                    relatedVideosGrid.innerHTML = '<p>暂无相关视频。</p>';
                }

            } else {
                videoTitleElem.textContent = '视频未找到';
                videoDescriptionElem.textContent = '抱歉，无法加载该视频的详细信息。';
                if(relatedVideosGrid) relatedVideosGrid.innerHTML = '';
            }
        } else if (!videoId) {
            videoTitleElem.textContent = '无效的视频链接';
            videoDescriptionElem.textContent = '请提供有效的视频ID。';
            if(relatedVideosGrid) relatedVideosGrid.innerHTML = '';
        } else {
            console.error('mockVideos is not defined or videoId is missing. Make sure data.js is loaded.');
            videoTitleElem.textContent = '加载视频数据出错';
            videoDescriptionElem.textContent = '无法加载视频，请稍后再试或检查 data.js 是否正确配置。';
            if(relatedVideosGrid) relatedVideosGrid.innerHTML = '';
        }

        // Mock comment submission
        const commentButton = document.querySelector('.add-comment button');
        const commentTextarea = document.querySelector('.add-comment textarea');
        const commentList = document.querySelector('.comment-list');

        if (commentButton && commentTextarea && commentList) {
            commentButton.addEventListener('click', function() {
                const commentText = commentTextarea.value.trim();
                if (commentText) {
                    const newComment = document.createElement('div');
                    newComment.classList.add('comment');
                    // Sanitize commentText before inserting as HTML if it were real user input
                    // For this mock, direct insertion is fine.
                    newComment.innerHTML = `
                        <p class="comment-author">我 (新评论):</p>
                        <p class="comment-text">${commentText.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
                    `;
                    commentList.appendChild(newComment);
                    commentTextarea.value = ''; // Clear textarea
                    alert('评论已提交 (模拟)。');
                } else {
                    alert('评论内容不能为空！');
                }
            });
        }
    }

    // Profile Page Logic
    if (document.querySelector('.profile-page')) { // Check if on profile page
        const profileUsernameElem = document.getElementById('profileUsername');
        const profileEmailElem = document.getElementById('profileEmail');
        // const avatarImage = document.getElementById('avatarImage'); // For future avatar updates

        const loggedInUsername = localStorage.getItem('username');
        // In a real app, email would also be fetched, but for mock, we'll just use a placeholder
        // or if it was stored during a mock registration.

        if (loggedInUsername) {
            if (profileUsernameElem) profileUsernameElem.textContent = loggedInUsername;
            // Mock email display - replace with actual if stored during registration
            if (profileEmailElem) profileEmailElem.textContent = loggedInUsername + '@example.com (模拟)';
        } else {
            // If not logged in, redirect to login page
            alert('请先登录以查看用户中心。');
            window.location.href = 'login.html'; // Assumes profile.html is in /pages/
        }

        // Mock Watch History and Favorites - for now, these are static in HTML
        // In a real app, this data would be fetched or dynamically generated.
        const watchHistoryList = document.getElementById('watchHistoryList');
        const noWatchHistory = document.getElementById('noWatchHistory');
        if (watchHistoryList && watchHistoryList.children.length === 0) {
            if(noWatchHistory) noWatchHistory.style.display = 'block';
        }

        const favoritesList = document.getElementById('favoritesList');
        const noFavorites = document.getElementById('noFavorites');
        if (favoritesList && favoritesList.children.length === 0) {
            if(noFavorites) noFavorites.style.display = 'block';
        }
    }
});
