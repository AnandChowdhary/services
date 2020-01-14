# 🔧 Services

These are microservices for automating everyday tasks, written in TypeScript/Node.js and deployed to [ZEIT](https://zeit.co).

**Endpoint:** [services.anandchowdhary.now.sh/api](https://services.anandchowdhary.now.sh/api/)

## ⭐ Endpoints

### `/wikipedia-summary`

Returns the introductory text for a search term. [Try it →](https://services.anandchowdhary.now.sh/api/wikipedia-summary?q=GitHub)

| Query param | Description | Example |
| ----------- | ----------- | ------- |
| `q` | Search query | Oswald Labs |
| `limit` | Max length of summary | 300 |
| `min` | Minimum length of summary | 8 |
| `cacheAge` | Seconds to cache for | 86400 |

### `/github-contributors`

Returns an SVG image with profile pictures of contributors of a repository on GitHub. [Try it →](https://services.anandchowdhary.now.sh/api/github-contributors?repo=elninotech/uppload)

| Query param | Description | Example |
| ----------- | ----------- | ------- |
| `repo` | GitHub repository path | elninotech/uppload |
| `width` | Profile picture width in pixels | 85 |
| `itemsPerLine` | Number of pictures per line | 8 |
| `padding` | Padding between pictures in pixels | 5 |
| `cacheAge` | Seconds to cache for | 86400 |

![Contributors](https://services.anandchowdhary.now.sh/api/github-contributors?repo=elninotech/uppload)

### `/github-members`

Returns an SVG image with profile pictures of members of a repository on GitHub. [Try it →](https://services.anandchowdhary.now.sh/api/github-members?org=elninotech)

| Query param | Description | Example |
| ----------- | ----------- | ------- |
| `org` | GitHub organization name | elninotech |
| `width` | Profile picture width in pixels | 85 |
| `itemsPerLine` | Number of pictures per line | 8 |
| `padding` | Padding between pictures in pixels | 5 |
| `cacheAge` | Seconds to cache for | 86400 |

![Contributors](https://services.anandchowdhary.now.sh/api/github-members?org=elninotech)

### `/github-files`

Returns a [Shields.io schema](https://shields.io/endpoint) for a badge with the number of files in a GitHub repository's directory. [Try it →](https://services.anandchowdhary.now.sh/api/github-files?repo=elninotech/uppload&path=src/i18n&subtract=1&label=i18n&message=%241%24%20language%24S%24&color=blueviolet)

![Badge example](https://img.shields.io/endpoint?url=https%3A%2F%2Fservices.anandchowdhary.now.sh%2Fapi%2Fgithub-files%3Frepo%3Delninotech%2Fuppload%26path%3Dsrc%2Fi18n%26subtract%3D1%26label%3Di18n%26message%3D%25241%2524%2520language%2524S%2524%26color%3Dblueviolet)

| Query param | Description | Example |
| ----------- | ----------- | ------- |
| `repo` | GitHub repository path | elninotech/uppload |
| `path` | Directory path | src/i18n |
| `add`<sup>1</sup> | Add to number of files | 0 |
| `subtract`<sup>1</sup> | Subtract from number of files | 1 |
| `label` | Shield label | i18n |
| `message`<sup>2</sup> | Shield message | $1$ language$S$ |
| `color` | Shield color | blueviolet |
| `cacheAge` | Seconds to cache for | 3600 |

- <sup>1</sup> Add and subtract numbers can be used, for example, to subtract the index.html file and return the number of content files
- <sup>2</sup> Special variables $1$ and $S$ are replaced with the number of files and pluralized "s" respectively

### Life data endpoints

These endpoints are used as webhooks for a cron job, and fetch data from various web services' APIs and update my [Life Data GitHub repo](https://github.com/AnandChowdhary/life-data).

| Endpoint | Description | File |
| -------- | ----------- | ---- |
| `/spotify` | My top artists data from Spotify | [top-artists.yml](https://github.com/AnandChowdhary/life-data/blob/master/top-artists.yml) |
| `/wakatime` | My programming data from Wakatime | [development.yml](https://github.com/AnandChowdhary/life-data/blob/master/development.yml) |
| `/owntracks` | My real-time location from OwnTracks | [location.json](https://github.com/AnandChowdhary/life-data/blob/master/location.json) |
| `/yoga` | My heart rate from HealthKit | [heart-rate.yml](https://github.com/AnandChowdhary/life-data/blob/master/heart-rate.yml) |
| `/yoga` | My step count from HealthKit | [step-count.yml](https://github.com/AnandChowdhary/life-data/blob/master/step-count.yml) |
| `/yoga` | My flights climbed from HealthKit | [flights-climbed.yml](https://github.com/AnandChowdhary/life-data/blob/master/flights-climbed.yml) |
| `/yoga` | My distance from HealthKit | [distance.yml](https://github.com/AnandChowdhary/life-data/blob/master/distance.yml) |
| `/yoga` | My active energy from HealthKit | [active-energy.yml](https://github.com/AnandChowdhary/life-data/blob/master/active-energy.yml) |
| `/yoga` | My basal energy from HealthKit | [basal-energy.yml](https://github.com/AnandChowdhary/life-data/blob/master/basal-energy.yml) |
| `/instagram-highlights` | My story highlights from Instagram | [instagram-highlights.json](https://github.com/AnandChowdhary/life-data/blob/master/instagram-highlights.json) |

## 📄 License

[MIT](https://github.com/AnandChowdhary/services/blob/master/LICENSE) © [Anand Chowdhary](https://anandchowdhary.com)
