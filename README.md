# Vulnerability Parser

Parses `npm audit` results to return the highest priority vulnerabilities

## installing
- `npm i` - installs the required dependencies

## testing
- `npm t` - will run the test suite to ensure everything works

## running
- `node index.js [filename]` - run using node to process the specified file.
  The output will be written to `output.json` in the current directory.

### options
- `--hideFixAvailable` - you can pass this flag for part 2 to hide the vulnerabilities which
  already have fixes

## development

I made the assumption that as well as seeing the logic used to process the file (which mostly
resides in `lib/processVulnerabilities.js`) you'd also like to be able to use it. So I created
a command line tool which would allow you to do so.

I've used mocha as my testing framework as it's the one I'm most comfortable with. The tests
can be found under the `test` directory. I used a TDD approach to ensure that what I was writing
fulfilled the brief. When testing I've tested the exported items from each file, I find that
by not testing the private implementations it's much easier to refactor later.

For the logic I originally considered a sorting algorithm to go from highest to lowest and then
pick the top, I also considered an algorithm which would sort them into their severity within
an object and then choose the highest severity which had items. However I wanted to try and make
the processing fast and do as few passes through the structure as possible so I settled on a
reduce method.

You'll notice through the commits I decided to change the approach to what the reducer was passing.
I found it easier in the first instance hold in state the current highest severity level as
refactored from a simple for loop which passed the first few tests. However I thought it would make
reviewing the code and understanding what was happening simpler to not have that extra data, which
was already available in the current accumulator's first item. The thing which made this more
longwinded than was necessary was the format of the data from npm. Having the vulnerabilities in an
object rather than an array meant I had to do some key fetching to get the items.
