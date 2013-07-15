// 载入模块
var Segment = require('segment').Segment;
// 创建实例
var segment = new Segment();
// 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
segment.useDefault();
//segment.loadDict('Dict.txt'); 
// 开始分词
console.log(segment.doSegment('【首尔“整形一条街”多为中国客？】最近有报道，首尔一条街有800多家整形医院，顾客多为中国人。新华社记者核实，首尔确有这样一条街，即位于首尔江南区最繁华的“狎鸥亭洞”，800多家的数字也比较靠谱。这里的顾客确以亚洲人为主，尤其是中国人和日本人。很多整形医院还打出中文广告。记者张青'));