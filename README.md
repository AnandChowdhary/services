# 🔧 Services

These are microservices for automating everyday tasks, written in TypeScript/Node.js and deployed to [ZEIT](https://zeit.co).

**Endpoint:** [services.anandchowdhary.now.sh/api](https://services.anandchowdhary.now.sh/api/)

## ⭐ Endpoints

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

## 📄 License

[MIT](https://github.com/AnandChowdhary/services/blob/master/LICENSE) © [Anand Chowdhary](https://anandchowdhary.com)
